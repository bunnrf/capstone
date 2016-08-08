# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# NOTE: 1. hand-picked post and image seeds
# NOTE: 2. random users and comments for fixed posts
# NOTE: 3. random top comments for fixed posts to demonstrate nested comments
# NOTE: 4. random votes

p "seeding start"

users = User.create([ { username: "demo", password: "password" }, { username: "michaelCera", password: "password" }, { username: "sarah", password: "password" }, { username: "mistersavage", password: "password" }])

t = Time.now
posts = Post.create([ { title: "List of sites that help you study harder, get more work done, and become an all-around more awesome person", description: "**BONUS - A bunch of other educational websites and productivity tools:

http://mailinator.com - free disposable email accounts
http://zamzar.com - online file conversion
http://sleepyti.me - tells you when you should go to bed/wake up for optimal sleep (if you believe in sleep cycles)
http://preyproject.com - free software to track, lock, and secure your computer, android, and iDevice (soon)
http://ocw.mit.edu/courses/ - MIT Open Courses
http://www.ottobib.com - Easy bibliography maker
https://www.p2pu.org/en/ - online peer-to-peer learning community
http://bigthink.com/ - interesting videos and articles to make you better informed
http://academicearth.org - another huge collection of free online courses
http://demonstrations.wolfram.com/topics.html - WolframAlpha also offers visual demonstrations of a bunch of different concepts.", author_id: 1 },

                      { title: "To brighten your day", author_id: 1 },
                      { title: "10 Foods you should learn to cook in your 20's", author_id: 2 },
                      { title: "Wallpaper Dump", author_id: 3 },
                      { title: "just dogs being dogs", author_id: 3 },
                      { title: "Improve your excel skills", description: "Excel is fun: https://www.youtube.com/user/ExcelIsFun#p/p
Contextures: http://www.contextures.com/
The spreadsheet page: http://spreadsheetpage.com/
Excel hero: http://www.excelhero.com/
Mr. Excel: http://www.mrexcel.com/
https://www.youtube.com/user/bjele123
Excel exposure: http://excelexposure.com/
Excel central: http://excelcentral.com/
Improve your excel: http://www.improveyourexcel.com/
Excel easy: http://www.excel-easy.com/
Excel function dictionary: http://www.xlfdic.com/
Chandoo: http://chandoo.org/
Subdomain of About.com: http://spreadsheets.about.com/
Duke University: https://faculty.fuqua.duke.edu/~pecklund/ExcelReview/ExcelReview.htm
http://www.myexceltutorial.com/
Excel tip of the month: http://isaacgottlieb.com/tip-of-the-month
Allen Wyatt's excel tips: http://excelribbon.tips.net/
Exceljet: https://exceljet.net/keyboard-shortcuts
GCF LearnFree: http://www.gcflearnfree.org/excel2010
Free training tutorial: http://www.free-training-tutorial.com/
Howcast: http://www.howcast.com/guides/573-How-to-Use-Microsoft-Excel/
Excel forum: http://www.excelforum.com/
Ozgrid: http://www.ozgrid.com/forum/forum.php
Excel Listserve: http://peach.ease.lsoft.com/archives/excel-g.html
Allexperts: http://www.allexperts.com/browse.cgi?catLvl=3&catID=1059
Google groups: https://groups.google.com/forum/?fromgroups#!forum/microsoft.public.excel
PC world: http://www.pcworld.com/article/229504/five_excel_nightmares_and_how_to_fix_them.html
PC world: http://www.pcworld.com/article/220782/use_microsoft_excel_for_everything.html", author_id: 1 },
                      { title: "My roommate and I built an infinity table.", author_id: 2 },
                      { title: "Some Strange Fruit from Around the World", description: "Source: http://wunderpix.com/strangest-fruits-in-the-world/", author_id: 1 },
                      { title: "We got new neighbors. They have dogs.", author_id: 2 },
                      { title: "Don't drink and drive", author_id: 3 },
                      { title: "Me and My Hero", description: "It was SUCH an honor to speak at TED earlier this year. But the most amazing moment for me may have been this, which happened right after my talk. I know. I KNOW.", author_id: 4 },
                      { title: "This website lets you track pokemon from your browser in realtime", description: "https://pokevision.com/", author_id: 3 },
                      { title: "so my friend's cat does this...", author_id: 3 },
                      { title: "Bill Nye Reaction Gifs", author_id: 3 },
                      { title: "Great gifts for science geeks.", author_id: 3 }])

images = Image.create([

{ title: "Plato Timer", description: "One of the best ways to get more done is the Pomodoro Technique (work for 25 mins, then take a 15 min break). This simple, beautiful timer does just that, and you can customize how long you want your breaks to be.

http://platowebdesign.com/timer", image_url: "http://i.imgur.com/vL4VjTh.png", ordinal: 0, post_id: 1 },

{ title: "Habitica - An RPG for your life", description: "Habitica turns your life into a series of RPG quests - this thing is amazing and really helps me get stuff done:

http://habitica.com", image_url: "http://i.imgur.com/iWUDtPC.png", ordinal: 1, post_id: 1 },

{ title: "ColdTurkey", description: "Can't get any work done cause you're too busy on Imgur? Use ColdTurkey to block it until you're done working.

http://getcoldturkey.com", image_url: "http://i.imgur.com/34tfOPf.png", ordinal: 2, post_id: 1 },

{ title: "Todoist", description: "Want to get more done? MAKE A LIST

Stop making to-do lists on sticky notes or in Notepad - this app makes it a lot easier, and you can sync your list on all your devices. Make a list of the studying or work you need to get done, and check it off as you go.

http://todoist.com", image_url: "http://i.imgur.com/etn62xj.png", ordinal: 3, post_id: 1 },

{ title: "Calm - easy meditation in your browser", description: "Calm - easy meditation in your browser
You can't work well if you're stressing out - Calm is a quick little meditation tool I like to use to get back on track:

http://calm.com/meditate", image_url: "http://i.imgur.com/VWFXJJp.png", ordinal: 4, post_id: 1 },

{ title: "Studyblue", description: "A painless way to make flashcards and study aids for your next test

http://studyblue.com", image_url: "http://i.imgur.com/TysZFgT.jpg", ordinal: 5, post_id: 1 },

{ title: "WolframAlpha", description: "The coolest science search engine ever.

If you';re an Imgur user, I'm gonna assume you know about this one, but you might not know that WA does more than just solve calculations. It helps solve chemistry problems, gives you information about historical, and a heck of a lot more.

https://www.wolframalpha.com", image_url: "http://i.imgur.com/lQprHgs.png", ordinal: 6, post_id: 1 },

{ title: "Pocket", description: "This is perfect for heavy researching - Pocket is an easy little web app that lets you save articles, sources etc. and access them on any device. Saves me tons of time when I&#039;m writing a paper and trying to keep my sources straight.

http://getpocket.com", image_url: "http://i.imgur.com/jSxW01Y.png", ordinal: 7, post_id: 1 },

{ title: "Khan Academy", description: "Thousand of free online courses about just about anything - perfect if you're studying for a test and need a quick recap  on a topic

http://khanacademy.org", image_url: "http://i.imgur.com/NVPk6hk.png", ordinal: 8, post_id: 1 },

{ title: "Unroll.me", description: "Have an inbox constantly filled with garbage spam emails? Unroll.me detects your email subscriptions automatically and can unsubscribe you from them en masse (saves me a lot of time deleting emails every day):

http://unroll.me", image_url: "http://i.imgur.com/6qWAG6o.png", ordinal: 9, post_id: 1 },


                        { image_url: "http://i.imgur.com/R8se5g1.gifv", ordinal: 0, post_id: 2 },


                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661670/food/cDZgb2o_qmky99.jpg", ordinal: 0, post_id: 3 },
                        { title: "1. A Deliciously Melty Grilled Cheese", description: "Serious Eats has a great step-by-step slideshow of how to make the ultimate grilled cheese. The key tip is that you should toast one side of each slice, sandwich the cheese between those toasted sides, then toast the other sides.
http://www.seriouseats.com/2013/04/how-to-make-the-best-grilled-cheese-sandwich-slideshow.html", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661669/food/7yivUsq_yy77kr.jpg", ordinal: 1, post_id: 3 },

                        { title: "2. A Truly Perfect Roast Chicken", description: "Thomas Keller’s recipe calls for super-high heat, three ingredients — chicken, salt, and pepper — and teaches you essential techniques that will last a lifetime.
http://www.buzzfeed.com/christinebyrne/roast-chicken-rules", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661670/food/AujF8ug_vgy0vs.jpg", ordinal: 1, post_id: 3 },

                        { title: "3. Basic Roasted Veggies", description: "Set the oven to 450°F, toss veggies with oil and kosher salt, spread out on a baking sheet so they aren’t too crowded, and roast until they look/taste good. The only trick is that you sort of have to understand which veggies take a little longer to cook — harder veggies like carrots, potatoes, broccoli, etc., take longer than soft mushrooms and tomatoes — so you’d cut those into smaller pieces so everything cooks at the same rate. Basic recipe below.
http://www.tablefortwoblog.com/roasted-vegetables/", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661671/food/7rsmgSd_zhai4s.jpg", ordinal: 2, post_id: 3 },

                        { title: "4. Fudgy Homemade Brownies", description: "First recipe is from One Sweet Appetite, although a lot of people also love Smitten Kitchen's recipe.
http://onesweetappetite.com/brownies/
http://smittenkitchen.com/blog/2010/01/best-cocoa-brownies/", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661669/food/lGpH2Gg_r5co8k.jpg", ordinal: 3, post_id: 3 },

                        { title: "5. Macaroni and Cheese From Scratch", description: "You don't even need a recipe.
http://www.buzzfeed.com/emofly/how-to-make-better-mac-n-cheese", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661671/food/LH9S1aJ_hn0b0f.jpg", ordinal: 4, post_id: 3 },

                        { title: "6. Perfectly Seared Steak", description: "Pat it very dry, season it, cook it over very high heat in the right kind of fat, let it rest. As for 'doneness' — buy a thermometer, poke it with your finger constantly, and practice makes perfect.
http://www.buzzfeed.com/christinebyrne/how-to-sear-the-perfect-steak-for-your-valentine", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661683/food/PhjorWT_tnk9ea.gif", ordinal: 5, post_id: 3 },

                        { title: "7. Killer Guacamole", description: "Authentic guacamole doesn’t have garlic or tons of lime juice in it. (Personally, I think tons of both makes it heavenly, so I add it anyway.) The most important thing is to choose avocados that are super ripe and salt aggressively.
http://www.bonappetit.com/test-kitchen/cooking-tips/article/want-to-make-better-guacamole-step-1", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661670/food/NA6Z1es_qjmkgm.jpg", ordinal: 6, post_id: 3 },

                        { title: "8. Easy Homemade Tomato Sauce", description: "Tomato sauce is just canned tomatoes with some kind of seasoning that you add cooked together for a while to let the flavor develop. Marcella Hazan’s famous tomato sauce recipe just has you simmer canned tomatoes with a butter and an onion cut in half. That works. So does sautéing a chopped onion, maybe some garlic, then adding the tomatoes and simmering for a while, like the second recipe from Bon Appetit. You can also get more complex by sautéing even more veggies (carrots, celery) and adding red wine and meat by clicking on the last link.
http://food52.com/recipes/13722-marcella-hazan-s-tomato-sauce-with-onion-and-butter, http://www.bonappetit.com/recipe/pasta-al-pomodoro, http://www.buzzfeed.com/christinebyrne/how-to-make-tomato-sauce", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661667/food/IWGtc47_ktzwso.jpg", ordinal: 7, post_id: 3 },

                        { title: "9. The Best Chocolate Chip Cookies", description: "The New York Times did a great story in 2008 where they tested and retested different chocolate chip cookie methods to “assemble a new archetypal cookie recipe.” The results indicated that letting your dough rest overnight before baking is essential.
http://www.averiecooks.com/2012/11/new-york-times-chocolate-chips-cookies-from-jacques-torres.html
And here's another one from IMaedThisForYou (sorry not really sure how to tag people, it's only my second post. ^.^)
http://www.food.com/recipe/extraordinary-chocolate-chip-cookies-258922", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661673/food/QuVmf5o_lupi0s.jpg", ordinal: 8, post_id: 3 },

                        { title: "10. Slow-Cooked Pulled Pork", description: "This is very easy with a slow cooker (aka Crock-Pot) — via the first link. If you don’t have a slow cooker, use the second one to do it in your oven and leave yourself lots of time.
http://www.foodnetwork.com/recipes/food-network-kitchens/slow-cooker-pulled-pork-sandwiches-recipe.html, http://www.seriouseats.com/recipes/2013/10/easy-oven-baked-pulled-pork-sandwiches.html", image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469661668/food/0isnVHV_pit5q8.jpg", ordinal: 9, post_id: 3 },


                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659930/wallpapers/UieUlMQ_ff9cca.jpg", ordinal: 0, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659900/wallpapers/Qni8TCs_grxyxv.jpg", ordinal: 1, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659903/wallpapers/lqLnjHr_k5zeee.jpg", ordinal: 2, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659899/wallpapers/QdOFm0l_q252ja.jpg", ordinal: 3, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659922/wallpapers/DsZMGE1_hn9bk9.png", ordinal: 4, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659905/wallpapers/C83eyv7_qfsouc.jpg", ordinal: 5, post_id: 4 },
                        { image_url: "http://res.cloudinary.com/dk4vv6bhu/image/upload/v1469659907/wallpapers/2w9dluC_e1gmmn.jpg", ordinal: 6, post_id: 4 },


                        { image_url: "http://i.imgur.com/Igsawi2.gif", ordinal: 0, post_id: 5 },
                        { image_url: "http://i.imgur.com/Rdo1G5x.gif", ordinal: 1, post_id: 5 },
                        { image_url: "http://i.imgur.com/TO1gI9d.gif", ordinal: 2, post_id: 5 },
                        { image_url: "http://i.imgur.com/wfU26EV.gifv", ordinal: 3, post_id: 5 },
                        { image_url: "http://i.imgur.com/HcVkAw6.gif", ordinal: 4, post_id: 5 },
                        { image_url: "http://i.imgur.com/mrcUpT1.gif", ordinal: 5, post_id: 5 },
                        { image_url: "http://i.imgur.com/Sy03WXI.gif", ordinal: 6, post_id: 5 },
                        { image_url: "http://i.imgur.com/o9BNjMI.gifv", ordinal: 7, post_id: 5 },
                        { image_url: "http://i.imgur.com/3lA6n1R.gif", ordinal: 8, post_id: 5 },
                        { image_url: "http://i.imgur.com/Fvj7vbj.gif", ordinal: 9, post_id: 5 },


                        { image_url: "http://i.imgur.com/eaoBRfx.png", ordinal: 0, post_id: 6 },


                        { description: "The materials and planning board", image_url: "http://i.imgur.com/sQdKDNN.jpg", ordinal: 0, post_id: 7 },
                        { description: "We found this door mirror at a local shop. It was pretty cheap, but it had bevelled edges. So we cut a slit into the boards to support the mirror as well as covering the edge. The holes will later house the LEDs.", image_url: "http://i.imgur.com/tTA1QfH.jpg", ordinal: 1, post_id: 7 },
                        { description: "We picked our stain while our companion took a nap.", image_url: "http://i.imgur.com/ZEAe39T.jpg", ordinal: 2, post_id: 7 },
                        { description: "We added one piece of wood in the middle for support, to fix some warping issues, and to hold the power strip.", image_url: "http://i.imgur.com/TvPD9HJ.jpg", ordinal: 3, post_id: 7 },
                        { description: "This is the homemade power outlet that will be plugged into the power strip for power.", image_url: "http://i.imgur.com/M1FxnXC.jpg", ordinal: 4, post_id: 7 },
                        { description: "We got the table into the apartment. Now all we had to wait for was the lights and two-way mirror.", image_url: "http://i.imgur.com/Q71H0nk.jpg", ordinal: 5, post_id: 7 },
                        { description: "Raspberry Pi came in the mail!", image_url: "http://i.imgur.com/CX12V67.jpg", ordinal: 6, post_id: 7 },
                        { description: "Toying around with it, trying to get the damn thing to work.", image_url: "http://i.imgur.com/o3ykuvN.jpg", ordinal: 7, post_id: 7 },
                        { description: "Finally got some lights to turn on. It took forever though. ", image_url: "http://i.imgur.com/j7EmHVw.jpg", ordinal: 8, post_id: 7 },
                        { image_url: "http://i.imgur.com/Rfq7wmn.jpg", ordinal: 9, post_id: 7 },
                        { image_url: "http://i.imgur.com/h9l7mCS.jpg", ordinal: 10, post_id: 7 },
                        { image_url: "http://i.imgur.com/ig4c2kQ.jpg", ordinal: 11, post_id: 7 },
                        { description: "At first, we could only get half the lights to work.", image_url: "http://i.imgur.com/saqgKIO.jpg", ordinal: 11, post_id: 7 },
                        { description: "Did a bit of editing to the code and got the damn thing to work!", image_url: "http://i.imgur.com/2gtuwoz.jpg", ordinal: 12, post_id: 7 },
                        { description: "Without the lights on. I personally enjoy how you can't see what's underneath the glass.", image_url: "http://i.imgur.com/mlc7nTB.jpg", ordinal: 13, post_id: 7 },
                        { image_url: "http://i.imgur.com/KBFCXNE.jpg", ordinal: 14, post_id: 7 },


{ title: "Dragon Fruit", description: "or a fruit with such an unusual appearance, you might expect it to taste strong but it tastes surprisingly mildly sweet. The flesh is very similar to the taste of kiwifruit as the black and crunchy seeds are similar.

The fruit can be eaten raw or as a juice and can even be made into wine. The flowers are also edible. It’s a favorite among health enthusiasts as it’s nutritious and contains only small amounts of calories.

Some varieties have white flesh while others are violet to purple in color.", image_url: "http://i.imgur.com/PYL230Q.jpg", ordinal: 0, post_id: 8 },
{ title: "Durian", description: "No other fruit is as pungent and as divisive as the durian. You either love the smelly fruit or you hate it with all your heart. It’s hard not to notice this huge spiked fruit when youhappen to go to a Chinatown.

Some love the smell while others are repulsed by it. But just to be safe, some hotels and public transportation systems banned the durian as they smell even when the husk is intact. And the odor stays for days.", image_url: "http://i.imgur.com/SYXiRSj.jpg", ordinal: 1, post_id: 8 },
{ title: "Carambola (Starfruit)", description: "Carambola, commonly referred to as starfruit, is the fruit of Averrhoa carambola, a species of tree native to the Philippines, Indonesia, Malaysia, Vietnam, Nepal, India, Bangladesh and Sri Lanka.

The fruit is popular throughout Southeast Asia, the South Pacific, Micronesia, and parts of East Asia. The tree is also cultivated throughout non-indigenous tropical areas, such as in Latin America, the Caribbean, and the southern United States.

The fruit has distinctive ridges running down its sides (usually five but can sometimes vary); in cross-section, it resembles a star, hence its name. The entire fruit is edible and is usually eaten out of hand. They may also be used in cooking and can be made into relishes, preserves, and juice drinks.", image_url: "http://i.imgur.com/czKMk49.jpg", ordinal: 2, post_id: 8 },
{ title: "Rambutan", description: "Rambut means hair and the name rambutan is derived from the word. So, hairy fruit. It’s native to Southeast Asia and is related to other similar fruits such as the longan.

Once you peel off the hairy exterior, the white, ridiculously delicious tender meat is revealed.", image_url: "http://i.imgur.com/a71wD4z.jpg", ordinal: 3, post_id: 8 },
{ title: "Kiwano (African Horned Melon)", description: "Horn melon produce spiky points throughout its bright yellow and orange, mottled skin. The interior contains a rich, jelly-like, lime green flesh studded with white seeds reminiscent of cucumber seeds. The melon has a sweet and tart, banana-lime taste. A flavor that is enhanced when chilled. The brighter the orange skin, the sweeter the flesh of the fruit. The Horn melon is the size of a large pear and generally weighs less than one pound. Both the seeds and the flesh are edible.", image_url: "http://i.imgur.com/Lbqsomp.jpg", ordinal: 4, post_id: 8 },
{ title: "Custard Apple/Sugar Apple", description: "The custard apple is a native of the tropical forests in Central America and has spread and adapted to other parts of the world including South America, Africa, and Asia. Outside, the skin looks tough. The inside, however, is creamy, pulpy, juicy meat with a sweet and tangy taste that melts in your mouth. It is a member of the annonacae family.", image_url: "http://i.imgur.com/MRsY2vc.jpg", ordinal: 5, post_id: 8 },
{ title: "Ugli Fruit", description: "The Ugli fruit, as you can see, is not very pleasing to the eyes hence its name. It is the hybrid of grapefruit (pomelo), orange, and tangerine. It grows wild in Jamaica. The fruit’s skin is light green but turns orange when it is fully ripe. The flesh is juicy and tastes more similar to a tangerine than to a grapefruit. The rind is fragrant.", image_url: "http://i.imgur.com/Yj5D3tH.jpg", ordinal: 6, post_id: 8 },
{ title: "Cherimoya", description: "The cherimoya, also spelled chirimoya, is the fruit of the species Annona cherimola, which generally is thought to be native to Ecuador, Colombia, Peru and Bolivia[1] then transported to the Andes and Central America.[1][2][3] Today, cherimoya is grown throughout South Asia, Central America, South America, California, Hawaii, southern Europe, East Africa, Kisii in particular and northern Africa.

Mark Twain called the cherimoya 'the most delicious fruit known to man.'[4] The creamy texture of the flesh gives the fruit its secondary name, custard apple.

Cherimoya is a deciduous or semi-evergreen shrub or small tree reaching 9 m (30 feet) tall. The leaves are alternate, simple, oblong-lanceolate, 7–15 cm long and 6–10 cm broad. The flowers are produced in small clusters, each flower 2–3 cm across, with six petals, yellow-brown, often spotted purple at the base.

The fruit is oval, often slightly oblate, 10–20 cm long and 7–10 cm in diameter, with a smooth or slightly tuberculated skin. The fruit flesh is white and creamy, and has numerous dark brown seeds embedded in it.[1] When ripe, the skin is green and gives slightly to pressure. Some characterize the fruit flavor as a blend of banana, pineapple, papaya, peach, and strawberry. The fruit can be chilled and eaten with a spoon, which has earned it another nickname, the ice cream fruit. Indeed, in Peru, it is commonly used in ice creams and yogurt.", image_url: "http://i.imgur.com/yp8wzv7.jpg", ordinal: 7, post_id: 8 },
{ title: "Physalis", description: "These fruits look unusual because of their husks that look like lanterns. They are related to tomatoes and eggplants and can be used as substitue for tomatoes. They are native to the Americas.", image_url: "http://i.imgur.com/4t3hV3j.jpg", ordinal: 8, post_id: 8 },
{ title: "Miracle Fruit", description: "These small bright red berries aren’t sweet at all. However, if you eat even just one fruit something amazing happens. Everything you eat becomes sweet. This effect lasts for half an hour or so.", image_url: "http://i.imgur.com/6N9EOXJ.jpg", ordinal: 9, post_id: 8 },


                        { image_url: "http://i.imgur.com/kUCMPWX.jpg", ordinal: 0, post_id: 9 },


                        { image_url: "http://i.imgur.com/ZSYVi2d.gifv", ordinal: 0, post_id: 10 },


                        { image_url: "http://i.imgur.com/UKEOAvj.jpg", ordinal: 0, post_id: 11 },


                        { image_url: "http://i.imgur.com/tnYcTEX.png", ordinal: 0, post_id: 12 },


                        { image_url: "http://i.imgur.com/rFBiyeR.jpg", ordinal: 0, post_id: 13 },
                        { image_url: "http://i.imgur.com/CAvnrUl.jpg", ordinal: 1, post_id: 13 },
                        { image_url: "http://i.imgur.com/8L65b0y.jpg", ordinal: 2, post_id: 13 },
                        { image_url: "http://i.imgur.com/latQmjr.jpg", ordinal: 3, post_id: 13 },
                        { image_url: "http://i.imgur.com/Lh6sQtz.jpg", ordinal: 4, post_id: 13 },
                        { image_url: "http://i.imgur.com/FxSkUVK.jpg", ordinal: 5, post_id: 13 },


                        { image_url: "http://i.imgur.com/R0Db3UP.gifv", ordinal: 0, post_id: 14 },
                        { image_url: "http://i.imgur.com/PxItSkc.gifv", ordinal: 1, post_id: 14 },
                        { image_url: "http://i.imgur.com/BbGnQpp.gifv", ordinal: 2, post_id: 14 },
                        { image_url: "http://i.imgur.com/qzNNlVg.gifv", ordinal: 3, post_id: 14 },
                        { image_url: "http://i.imgur.com/wcgSVCQ.gifv", ordinal: 4, post_id: 14 },
                        { image_url: "http://i.imgur.com/9PE19mg.gifv", ordinal: 5, post_id: 14 },
                        { image_url: "http://i.imgur.com/2NOtmu5.gifv", ordinal: 6, post_id: 14 },
                        { image_url: "http://i.imgur.com/7nBBlPV.gifv", ordinal: 7, post_id: 14 },
                        { image_url: "http://i.imgur.com/V9xX3jY.gifv", ordinal: 8, post_id: 14 },
                        { image_url: "http://i.imgur.com/ki5RuOu.gifv", ordinal: 9, post_id: 14 },


                        { title: "Aerogel", description: "Also known as frozen smoke, Aerogel is the world's lowest density solid, clocking in at 96% air. It's basically just a gel made from silicon, except all the liquid has been taken out and replaced with gas instead. If you hold a small piece in your hand, it's practically impossible to either see or feel, but if you poke it, it's like styrofoam.
Aerogel isn't just neat, it's useful. It supports up to 4,000 times its own weight and can apparently withstand a direct blast from two pounds of dynamite. It's also the best insulator in existence, which is why we don't have Aerogel jackets: it works so well that people were complaining about overheating on Mt. Everest.

Get it from here: http://www.buyaerogel.com/
The cheapest is about $10", image_url: "http://i.imgur.com/fnbTGAL.jpg", ordinal: 0, post_id: 15 },
                        { title: "Ecosphere", description: "Inside these sealed glass balls live shrimp, algae, and bacteria, all swimming around in filtered seawater. Put it somewhere with some light, and this little ecosystem will chug along happily for years, no feeding or cleaning necessary, totally oblivious to the fact that the rest of the world exists outside.

EcoSpheres came out of research looking at ways to develop self-contained ecosystems for long duration space travel. They're like little microcosms for the entire world, man. But ask yourself: are we the shrimp, or the algae?

Price: $80 for the smallest
http://www.eco-sphere.com/", image_url: "http://i.imgur.com/rOqdYWq.jpg", ordinal: 1, post_id: 15 },
                        { title: "Mars Rocks", description: "NASA has been trying to figure out how to get a sample of rock back from Mars for a while now. You can beat them to the punch and pick up a little piece of the red planet without having to travel a hundred million miles, by just taking advantage of all the rocks Mars sends our way.

Every once in a while, a meteorite smashes into Mars hard enough to eject some rocks out into orbit around the sun. And every once in a while, one of these rocks lands on Earth. It doesn't happen often, but it does happen, and whoever finds the meteorite is allowed to cut it up into bits and sell it to people who want to have their very own piece of another planet.

Price: $20++
http://www.meteoritemarket.com/TSS.htm", image_url: "http://i.imgur.com/pIT71XK.jpg", ordinal: 2, post_id: 15 },
                        { title: "Gömböc", description: "The Gömböc is a self-righting object, which means that no matter which way you put it down, it stands itself back up. It's like a Weeble, except it doesn't cheat by having a weight at the bottom, and it's the only shape that can do this.

The existence of a shape with these properties was conjectured in 1995, but it took ten years for someone to figure out how to actually make one that worked. And then everyone was embarrassed when it turned out that turtles had evolved this same basic shape in their shells a long time ago, to make it easier for them to roll themselves back over if they get flipped.

Price: $199
http://www.gomboc-shop.com/standard-gomboc.html", image_url: "http://i.imgur.com/J6wcHYl.jpg", ordinal: 3, post_id: 15 },
                        { title: "Violet Laser Pointer", description: "It's no longer geeky enough to have a red laser pointer, or a green laser pointer, or even a blue laser pointer. Keep moving up the spectrum until you get to violet, and you'll find the new hotness at 405 nanometers.

So what's next year's new color going to be? It's looking like orange, but they're not quite what I'd call affordable yet. Something to look forward to for next year, especially if you're going for your own personal laser rainbow.

Price: $70+
http://www.biglasers.com/purple-laser-pointers", image_url: "http://i.imgur.com/FIs1jZ3.jpg", ordinal: 4, post_id: 15 },
                        { title: "Gallium", description: "Gallium is a silvery metal with atomic number 31. It's used in semiconductors and LEDs, but the cool thing about it is its melting point, which is only about 85 degrees Fahrenheit. If you hold a solid gallium crystal in your hand, your body heat will cause it to slowly melt into a silvery metallic puddle. Pour it into a dish, and it freezes back into a solid.

While you probably shouldn't lick your fingers after playing with it, gallium isn't toxic and won't make you crazy like mercury does. And if you get tired of it, you can melt it onto glass and make yourself a mirror.

Price: $50+
http://www.mcssl.com/store/gallium-source", image_url: "http://i.imgur.com/rtQVZml.jpg", ordinal: 5, post_id: 15 },
                        { title: "Miracle berries", description: "By themselves, Miracle berries don't taste like much. The reason to eat them is that they contain a chemical called miraculin that binds to the sweet taste receptors on your tongue, changing their shape and making them respond to sour and acidic foods.

The upshot of this effect is that some things you eat taste spectacularly different. Straight Tabasco sauce tastes like donut glaze. Guinness tastes like a chocolate malt. Goat cheese tastes like cheesecake. After about an hour of craziness, your taste buds go back to normal, no harm done.

Price: $15
http://www.thinkgeek.com/product/ab3f/", image_url: "http://i.imgur.com/HeAP5Hr.jpg", ordinal: 6, post_id: 15 },
                        { title: "DNA Genotype", description: "There's nothing more personal than someone's own DNA. And there are ways to give the gift DNA that won't get you children or arrested. With just a little bit of spit, you can get an genotype analysis that will reveal fun insights about longevity, intelligence, susceptibility to diseases, and even food preferences.

While the technology hasn't reached the point where you can affordably get a complete sequence of an entire genome, looking at specific markers is still good enough to suggest some things worth looking out for while spurring a lively nature versus nurture debate.

Price: $100
https://www.23andme.com/", image_url: "http://i.imgur.com/Dfe9x7E.jpg", ordinal: 7, post_id: 15 },
                        { title: "Klein bottle", description: "If you want to give a mathematician something to try to wrap their head around, a Klein bottle is a good place to start. A real Klein bottle is an object with no inside and no outside that can only exist in four dimensions. These glass models exist in three, which means that unlike the real thing, they can actually hold liquid.

The difference between the models and the real thing is that by adding an extra dimension, you can make it so that the neck of the bottle doesn't actually intersect the side of the bottle. Take a couple aspirin and try to picture that in your head.

Price: $35
http://www.kleinbottle.com/baby_klein.htm", image_url: "http://i.imgur.com/WiQSpqC.jpg", ordinal: 8, post_id: 15 }])

p "fixed posts created", Time.now - t
t = Time.now

RANDOM_USER_COUNT = 250
RANDOM_COMMENT_COUNT = 750
RANDOM_VOTES_COUNT = 10000
RANDOM_POSTS_COUNT = 1000
TOTAL_USER_COUNT = RANDOM_USER_COUNT + User.count

def create_random_comment
  { body: Faker::StarWars.quote.html_safe.truncate(126), commenter_id: rand(TOTAL_USER_COUNT) + 1  }
end

def create_comment(post_id, parent_comment_id = nil)
  comment = create_random_comment
  comment[:post_id] = post_id
  comment[:parent_comment_id] = parent_comment_id if parent_comment_id
  comment
end

def create_child_comments(weight, post_id)
  Array.new(weight) do
    comment = create_comment(post_id)
    if rand(4) < 1 && weight > 0
      comment[:child_comments_attributes] = create_child_comments(weight - rand(weight + 1) ,post_id, )
    end

    votes = Array.new(weight * 2 + rand(11)) { { vote_type: "upvote", user_id: rand(TOTAL_USER_COUNT) + 1, votable_type: "Comment" } } if weight > 0
    comment[:votes_attributes] = votes

    comment
  end
end

def create_random_vote(user_count, post_count, comment_count)
  vote_type = (rand(20) > 18) ? "downvote" : "upvote"
  user_id = rand(user_count) + 1

  votable_id, votable_type = (rand(10) > 4) ? [rand(comment_count) + 1, "Comment"] : [rand(post_count) + 1, "Post"]

  { vote_type: vote_type, user_id: user_id, votable_id: votable_id, votable_type: votable_type }
end

random_users_arr = Array.new(RANDOM_USER_COUNT) { { username: Faker::Internet.user_name, password: "password" } }
random_users = User.create(random_users_arr)
p "random users created", Time.now - t
t = Time.now

fixed_posts_count = Post.count
random_comments_arr = Array.new(RANDOM_COMMENT_COUNT) { create_random_comment }.each { |c| c[:post_id] = rand(fixed_posts_count) + 1 }
random_comments = Comment.create(random_comments_arr)
p "random comments created", Time.now - t
t = Time.now

(RANDOM_COMMENT_COUNT / 4).times do
  parent_comment = random_comments.sample
  random_comment = random_comments.sample
  random_comment[:post_id] = parent_comment.post_id
  random_comment[:parent_comment_id] = parent_comment.id unless random_comment.id == parent_comment.id
  random_comment.save
end

top_comments = []
fixed_posts_count.times do |post_idx|
  post_id = post_idx + 1
  3.times do
    weight = rand(21) + 5
    comment = create_comment(post_id)

    child_comments = create_child_comments(weight, post_id)
    comment[:child_comments_attributes] = child_comments

    votes = Array.new(weight * 5 + (rand(60) - 20)) { { vote_type: "upvote", user_id: rand(TOTAL_USER_COUNT) + 1, votable_type: "Comment" } }
    comment[:votes_attributes] = votes

    top_comments << comment
  end
end
p "top comments generated", Time.now - t
t = Time.now
top_comments = Comment.create(top_comments)
p "top comments created", Time.now - t
t = Time.now

Vote.create(Array.new(RANDOM_VOTES_COUNT) { create_random_vote(User.count, fixed_posts_count, RANDOM_COMMENT_COUNT) })
p "random votes created", Time.now - t
t = Time.now

random_image_urls = File.readlines(File.dirname(__FILE__) + "/urls.txt").map(&:chomp).push("http://i.imgur.com/h9M99vS.jpg")

random_posts = []
RANDOM_POSTS_COUNT.times do
  random_posts.push( { title:Faker::Book.title.html_safe.truncate(126), author_id: rand(TOTAL_USER_COUNT) + 1, images_attributes: [ { description: (rand(10) > 7 ? Faker::Hacker.say_something_smart.html_safe : nil), image_url: random_image_urls.sample, ordinal: 0 } ] } )
end
p "random posts generated", Time.now - t
t = Time.now
Post.create(random_posts)
p "random posts created", Time.now - t
t = Time.now

total_posts_count = Post.count
Comment.create(Array.new(RANDOM_COMMENT_COUNT) { create_comment(rand(total_posts_count) + 1) } )
p "random comments created", Time.now - t
t = Time.now

comments_count = Comment.count
Vote.create(Array.new(RANDOM_VOTES_COUNT) { create_random_vote(TOTAL_USER_COUNT, total_posts_count, comments_count) })
p "random votes created", Time.now - t
p "seeding done"
