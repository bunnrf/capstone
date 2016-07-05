# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([ { username: "user1", password: "password" }, { username: "user2", password: "password" }, { username: "user3", password: "password" } ])

posts = Post.create([ { title: "user1 post1", description: "description", author_id: 1 },
                      { title: "user1 post2", description: "aefeaefaefe", author_id: 1 },
                      { title: "user2 post1", description: "21description", author_id: 2 },
                      { title: "user3 post1", description: "31description", author_id: 3 },
                      { title: "user3 post2", description: "32description", author_id: 3 },
                      { title: "user1 post3", description: "13description", author_id: 1 },
                      { title: "user2 post2", description: "aefeaefaefe", author_id: 2 },
                      { title: "user1 post4", description: "14description", author_id: 1 },
                      { title: "user2 post3", description: "23description", author_id: 2 },
                      { title: "user3 post3", description: "33description", author_id: 3 }])

images = Image.create([ { title: "post1 image1", description: "image1 description", image_url: "http://i.imgur.com/rh2xAjD.jpg", ordinal: 1, post_id: 1 },
                        { title: "post1 image2", description: "image2 description", image_url: "http://i.imgur.com/0aWet85.jpg", ordinal: 2, post_id: 1 },
                        { title: "post1 image3", description: "image3 description", image_url: "http://i.imgur.com/h9M99vS.jpg", ordinal: 3, post_id: 1 },
                        { title: "post2 image1", description: "image1 description", image_url: "http://i.imgur.com/RiX7XfW.jpg", ordinal: 1, post_id: 2 },
                        { title: "post3 image1", description: "image2 description", image_url: "http://i.imgur.com/QlRsuVz.jpg", ordinal: 1, post_id: 3 },
                        { title: "post3 image2", description: "image2 description", image_url: "http://i.imgur.com/24oR1WH.jpg", ordinal: 2, post_id: 3 },
                        { title: "post4 image1", description: "image2 description", image_url: "http://i.imgur.com/UieUlMQ.jpg", ordinal: 1, post_id: 4 },
                        { title: "post5 image1", description: "image1 description", image_url: "http://i.imgur.com/rh2xAjD.jpg", ordinal: 1, post_id: 5 },
                        { title: "post5 image2", description: "image2 description", image_url: "http://i.imgur.com/0aWet85.jpg", ordinal: 2, post_id: 5 },
                        { title: "post6 image1", description: "image1 description", image_url: "https://i.imgur.com/1PUd6il.jpg", ordinal: 1, post_id: 6 },
                        { title: "post7 image1", description: "image1 description", image_url: "https://i.imgur.com/voIIzxw.jpg", ordinal: 1, post_id: 7 },
                        { title: "post7 image2", description: "image2 description", image_url: "http://i.imgur.com/QlRsuVz.jpg", ordinal: 2, post_id: 7 },
                        { title: "post8 image1", description: "image1 description", image_url: "https://i.imgur.com/eZoZkfx.jpg", ordinal: 1, post_id: 8 },
                        { title: "post9 image1", description: "image1 description", image_url: "https://i.imgur.com/ApIR0YL.jpg", ordinal: 1, post_id: 9 },
                        { title: "post10 image1", description: "image1 description", image_url: "http://i.imgur.com/h9M99vS.jpg", ordinal: 1, post_id: 10 },
                        { image_url: "http://i.imgur.com/h9M99vS.jpg", ordinal: 2, post_id: 10 }])

comments = Comment.create([ { body: "post1 comment1", commenter_id: 2, commentable_id: 1, commentable_type: "Post" },
                            { body: "post1 comment2", commenter_id: 1, commentable_id: 1, commentable_type: "Post" },
                            { body: "post1 comment3", commenter_id: 3, commentable_id: 1, commentable_type: "Post" },
                            { body: "post1 comment4", commenter_id: 2, commentable_id: 1, commentable_type: "Post" },
                            { body: "post1 comment5", commenter_id: 1, commentable_id: 1, commentable_type: "Post" },
                            { body: "post1 comment6", commenter_id: 2, commentable_id: 1, commentable_type: "Post" },
                            { body: "comment1 comment1", commenter_id: 1, commentable_id: 1, commentable_type: "Comment" }])
