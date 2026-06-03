import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  lang: 'en' | 'id';
  category: string;
  author: string;
  content: string;
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Simple frontmatter parser matching --- block at the beginning
      const match = fileContents.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
      const metadata: Record<string, string> = {}
      let content = fileContents

      if (match) {
        const frontmatter = match[1]
        content = match[2]
        frontmatter.split('\n').forEach((line) => {
          const parts = line.split(':')
          if (parts.length >= 2) {
            const key = parts[0].trim()
            const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '')
            metadata[key] = value
          }
        })
      }

      return {
        slug,
        title: metadata.title || slug,
        description: metadata.description || '',
        date: metadata.date || '',
        coverImage: metadata.coverImage || '/images/blog/placeholder.png',
        lang: (metadata.lang === 'id' ? 'id' : 'en') as 'en' | 'id',
        category: metadata.category || 'General',
        author: metadata.author || 'Team ImAgents',
        content,
      }
    })

  // Sort posts by date descending
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) {
      return null
    }
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Simple frontmatter parser
    const match = fileContents.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
    const metadata: Record<string, string> = {}
    let content = fileContents

    if (match) {
      const frontmatter = match[1]
      content = match[2]
      frontmatter.split('\n').forEach((line) => {
        const parts = line.split(':')
        if (parts.length >= 2) {
          const key = parts[0].trim()
          const value = parts.slice(1).join(':').trim().replace(/^['"]|['"]$/g, '')
          metadata[key] = value
        }
      })
    }

    return {
      slug,
      title: metadata.title || slug,
      description: metadata.description || '',
      date: metadata.date || '',
      coverImage: metadata.coverImage || '/images/blog/placeholder.png',
      lang: (metadata.lang === 'id' ? 'id' : 'en') as 'en' | 'id',
      category: metadata.category || 'General',
      author: metadata.author || 'Team ImAgents',
      content,
    }
  } catch (e) {
    return null
  }
}
