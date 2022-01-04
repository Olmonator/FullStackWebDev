const dummy = (blogs) => {
  return 1
}

const likes = (blogs) => {
    console.log("TEST: blogs", blogs)
    if (blogs.length === 0) {
        console.log("TEST: empty bloglist")
        return 0
    }
    if (blogs.length === 1) {
        console.log("TEST: blocklist has only one entry")
        return blogs[0].likes
    }
    return blogs.map(blog => blog.likes).reduce((p, t) => p + t)
}

module.exports = {
  dummy, likes
}