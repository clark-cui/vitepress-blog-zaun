const globby = require('globby')
const matter = require('gray-matter')
const fs = require('fs-extra')
const path = require('path')

module.exports = {
  getPosts,
  generatePaginationPages
}

async function getPosts() {
  let paths = await getPostMDFilePaths()
  let posts = await Promise.all(
    paths.map(async (item) => {
      const content = await fs.readFile(item, 'utf-8')
      const {
        data
      } = matter(content)
      data.date = _convertDate(data.date)
      return {
        frontMatter: data,
        regularPath: `/${item.replace('.md', '.html')}`
      }
    })
  )
  posts.sort(_compareDate)
  return posts
}

function _convertDate(date = new Date().toString()) {
  const json_date = new Date(date).toJSON()
  return json_date.split('T')[0]
}

function _compareDate(obj1, obj2) {
  return obj1.frontMatter.date < obj2.frontMatter.date ? 1 : -1
}

async function getPostMDFilePaths() {
  let paths = await globby(['**.md'], {
    ignore: ['node_modules', 'README.md']
  })
  return paths.filter((item) => item.includes('blog/'))
}