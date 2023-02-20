const mongoose = require('mongoose')
const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/'

const Place = require('./../models/post.model')

const places = [
  {name: 'Gyeongbokgung Palace',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Gyeongbokgung-GeunJeongJeon.jpg',
  address: '161 Sajikro',
  area: 'Jongno-gu / Insadong',
  description: `Gyeongbokgung (Korean: 경복궁), also known as Gyeongbokgung Palace or Gyeongbok Palace, was the main royal palace of the Joseon dynasty. Built in 1395, it is located in northern Seoul, South Korea. The largest of the Five Grand Palaces built by the Joseon dynasty, Gyeongbokgung served as the home of Kings of the Joseon dynasty, the Kings' households, as well as the government of Joseon. Gyeongbokgung continued to serve as the main palace of the Joseon dynasty until the premises were destroyed by fire during the Imjin War (1592–1598) and abandoned for two centuries. However, in the 19th century, all of the palace's 7,700 rooms were restored under the leadership of Prince Regent Heungseon during the reign of King Gojong. Some 500 buildings were restored on a site of over 40 hectares. The architectural principles of ancient Korea were incorporated into the tradition and appearance of the Joseon royal court. In the early 20th century, much of the palace was systematically destroyed by Imperial Japan. On January 21, 1963, it was designated as a cultural property. Since the 1990s, the walled palace complex is gradually being restored to its original form. It also houses the National Palace Museum and the National Folk Museum within the premises of the complex.` , 
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: 'http://www.royalpalace.go.kr:8080/html/eng_gbg/main/main.jsp', 
  // displayMap: String, 
}, 
{
  name: 'Bukchon Hanok traditional Village',
  photo: 'https://www.hotelscombined.fr/rimg/dimg/79/5c/2a4a56c0-lm-169100-169b609d730.jpg?width=1366&height=768&xhint=1937&yhint=1193&crop=true',
  address: '37 Gyedong-gil,',
  area: 'Jongno-gu / Insadong',
  description: `Bukchon Hanok Village is a Korean traditional village in Seoul with a long history located on the top of a hill between Gyeongbok Palace, Changdeok Palace and Jongmyo Royal Shrine. The traditional village is composed of many alleys, hanok and is preserved to show a 600-year-old urban environment. The area of Bukchon, which consists of neighborhoods: Wonseo-dong, Jae-dong, Gye-dong, Gahoe-dong and Insa-dong, was traditionally the residential quarter of high-ranking government officials and nobility during the Joseon Dynasty. It is located north of Cheonggye Stream and Jongno, hence named Bukchon, which means north village.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none, 
  // displayMap: String, 
}, 
{
  name: 'Dongdaemun Design Plaza',
  photo: 'https://upload.wikimedia.org/wikipedia/en/8/8f/Dongdaemun_Design_Plaza_at_night%2C_Seoul%2C_Korea.jpg',
  address: '281 Eulji-ro',
  area: 'Jung-gu / Dongdaemun',
  description:`The Dongdaemun Design Plaza, abbreviated as DDP, is a major urban development landmark in Seoul, South Korea, designed by Zaha Hadid and Samoo, with a distinctively neofuturistic design characterized by the "powerful, curving forms of elongated structures." The landmark is the centerpiece of South Korea's fashion hub and popular tourist destination, Dongdaemun, featuring a walkable park on its roofs, large global exhibition spaces, futuristic retail stores, and restored parts of the Seoul fortress. The DDP has been one of the main reasons for Seoul's designation as the World Design Capital in 2010. Construction started in 2009, and it was officially inaugurated on March 21, 2014. It is physically connected to Seoul Subway via Dongdaemun History & Culture Park Station on Line 2, 4, and 5.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: none, 
  // displayMap: String,  
}, 
{
  name: 'Cheonggyecheon Stream',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/51/2932451_image2_1.bmp',
  address: '1 Cheonggyecheon-ro',
  area: 'Jung-gu / Dongdaemun',
  description: `Cheonggyecheon (Korean: 청계천) is a 10.9-kilometre-long (6.8 mi) modern public recreation space in downtown Seoul, South Korea. The massive urban renewal project is on the site of a stream that flowed before the rapid post-war economic development caused it to be covered by transportation infrastructure. The US$335 million project initially attracted much public criticism, however, since its opening in 2005, it has become popular among residents and tourists.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none; 
  // displayMap: String, 
}, 
{
  name: 'Myenongdong Main shopping Street And Area',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Myeongdong_Neon_at_Night%2C_Seoul.jpg',
  address: '23-7 Myeong-dong',
  area: ' Jung-gu / Myeong-dong',
  description: `Myeongdong (Korean: 명동; lit. 'bright cave' or 'bright tunnel') is a dong in Jung-gu, Seoul, South Korea between Chungmu-ro, Eulji-ro, and Namdaemun-ro. It covers 0.99km² with a population of 3,409 and is mostly a commercial area, being one of Seoul's main shopping, parade route and tourism districts. In 2011, 2012 and 2013, Myeong-dong was listed as the ninth most expensive shopping street in the world. The area is known for its two historically significant sites, namely the Myeongdong Cathedral and the Myeongdong Nanta Theatre. Myeongdong dates back to the Joseon Dynasty when it was called Myeongryebang (Korean: 명례방) and mostly a residential area. During the Japanese era the name was changed to Myeongchijeong (Korean: 명치정) and became more of a commercial district, being influenced by the rising commerce in the neighboring Chungmuro area. It became the official district of Myeongdong in 1946, after independence. After the Korean War and into the 1960s, the economy blossomed and the financial sector from Namdaemun-ro and Euljiro gradually expanded into Myeongdong. The area flourished as city renovations took place and highrise buildings were built. Many department stores, shopping centers, restaurants, upscale shops and boutiques set up their businesses in Myeongdong and it became popular with the young and trendy in the 1970s. Besides being a major commercial and financial district, Myeongdong has been a popular location for political demonstrations and protests, especially during the turbulent years of the 1980s and 1990s. Myeongdong Cathedral has been a frequent spot for many of these demonstrations and still is to this day. As of March 2000, Myeongdong's has been designated as a special Tourism Promotion Area and is one of the stops on the official Seoul City Bus tour's main route.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none, 
  // displayMap: String, 
}, 
{
  name: 'N Seoul Tower',
  photo: 'https://lh3.googleusercontent.com/p/AF1QipNjKXNktRJNeQg5DgqzD8llPqAderLSk-UrA3LJ=s680-w680-h510',
  address: '105 Namsangongwon-gil',
  area: 'Yongsan-gu / Namsan',
  description: `The N Seoul Tower (Korean: N 서울타워), officially the YTN Seoul Tower and commonly known as Namsan Tower or Seoul Tower, is a communication and observation tower located on Nam Mountain in central Seoul, South Korea. The 236-meter (774 ft)-tall tower marks the second highest point in Seoul and is considered a local landmark. Built in 1969, the N Seoul Tower is South Korea's first general radio wave tower, providing TV and radio broadcasting in Seoul. Currently, the tower broadcasts signals for Korean media outlets, such as KBS, MBC, and SBS.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: 'http://www.nseoultower.co.kr/eng/', 
  // displayMap: String, 
}, 
{
  name: 'Itaewon Main Shopping street',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/09/2933409_image2_1.bmp',
  address: '196 Itaewon-ro',
  area: '	Yongsan-gu / Itaewon',
  description: `Itaewon (Korean: 이태원) is multi-cultural commercial area located in Seoul, South Korea. it is one of the most popular neighborhoods in Seoul, known for its nightlife and trendy restaurants. Itaewon was originally a transportation hub where travelers could get horses during the Goryeo Dynasty (918-1392). During the Joseon Dynasty (1392-1910), Itaewon became more of a significant area. Itaewon became 1637 a refuge for Buddhist nuns and women that had been assaulted by foreign invaders. Itaewon housed the city's largest cemetery until 1937. The recent history of the Itaewons district of Seoul's Yongsan District is closely linked to the US military base Yongsan Garrison established in 1945. With the large number of bars and brothels, the area has been coded as a dangerous place for many Koreans. Here, security was not just a local matter but sometimes blew up into national or geopolitical crises. Since US soldiers were given pleasure leave from 1957, brothels have sprung up in Itaewon. Minors and women were kidnapped and forced into prostitution well into the 1980s, the South Korean government designated some locations as official "comfort facilities" for US soldiers. Twenty years after the Korean War (1950–53), Itaewon became a shopping district. The district became in the time gentrified, and in 2013 the US military moved its base with 17,000 soldiers to southern Seoul. Itaewon also became something of a home for the LGBT movement and was considered to be as open to foreigners as it was to Koreans. However, while representative commercial buildings had been erected in Itaewon, the area's characteristic of narrow streets had remained.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none, 
  // displayMap: String, 
}, 
{
  name: 'Banpo Bridge',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/83/2616883_image2_1.jpg',
  address: '40, Sinbanpo-ro 11-gil ',
  area: 'Seocho-gu & Yongsan-gu',
  description: `The Banpo Bridge (Korean: 반포대교) is a major bridge in downtown Seoul over the Han River, South Korea, connecting the Seocho and Yongsan districts. The bridge is on top of Jamsu Bridge, forming the upper half of a double-deck bridge; it is the first double deck bridge built in South Korea. During periods of high rainfall, the Jamsu Bridge is designed to submerge as the water level of the river rises, as the lower deck lies close to the waterline. In the past decade, the bridge has submerged every year, and the bridge and surrounding area is cleared of mud and silt shortly afterward. The bridge was built as a girder bridge and was completed in 1982. The south side, during times without global pandemics, has a yearly fall market, with live music and food trucks. The northern side has several bike and skating ramps. Moonlight Rainbow Fountain : The Moonlight Rainbow Fountain (Korean: 달빛무지개 분수) is the world's longest bridge fountain that set a Guinness World Record with nearly 10,000 LED nozzles that run along both sides that is 1,140m long, shooting out 190 tons of water per minute. Installed in September 2009 on the Banpo Bridge, former mayor of Seoul Oh Se-hoon declared that the bridge will further beautify the city and showcase Seoul's eco-friendliness, as the water is pumped directly from the river itself and continuously recycled. The bridge has 38 water pumps and 380 nozzles on either side, which draw 190 tons of water per minute from the river 20 meters below the deck, and shoots as far as 43 meters horizontally.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none, 
  // displayMap: String, 
},
{
  name: 'Seodaemun Prison History Hall',
  photo: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/dc/e6/84/seodaemun-prison-history.jpg?w=700&h=-1&s=1',
  address: '251 Tongil-ro',
  area:'Seodaemun-gu',
  description: `Seodaemun Prison History Hall is a museum and former prison in Seodaemun-gu, Seoul, South Korea. It was constructed beginning in 1907. The prison was opened on October 21, 1908, under the name Gyeongseong Gamok. During the early part of the Japanese colonial period it was known as Keijo Prison (Keijō Kangoku, the Japanese pronunciation of Gyeongseong Gamok). Its name was changed to Seodaemun Prison in 1923, and it later had several other names. The museum preserves and displays Seodaemun Prison signifying the suffering and pain of Koreans during the modern period. Here, independence activists and pro-democracy activities were jailed and martyred. Despite such a history of suffering, Koreans achieved independence and democracy. The Seodaemun Prison History Hall represents the history of struggle to achieve Korea's independence and democracy with such indomitable spirit and potential.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: 'https://www.sscmc.or.kr/foreign/eng/introduction.html', 
  // displayMap: String, 
}, 
{
  name: 'Coex Aquarium',
  photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/COEX_Aqurium_2016.jpg/1024px-COEX_Aqurium_2016.jpg',
  address: '513 Yeongdong-daero',
  area: 'Gangnam-gu',
  description: `The COEX Aquarium in Gangnam district, Seoul, is one of South Korea's Public Aquariums. The aquarium is housed within the COEX mall, which is, itself, part of the larger COEX Convention & Exhibition Center. The aquarium opened in 2000. The COEX Aquarium features 90 exhibition tanks grouped in fourteen "discovery zones", including six themed areas. The COEX Aquarium is arranged such that visitors follow a preset path through the aquarium, experiencing each of the themed areas in turn. Each exhibit features a dedicated aquarium tank where visitors can view species of fish indigenous to the theme location. In addition to fish, other local animals are included in the exhibit such as birds, otters, and appropriate vegetation is also included in each exhibit. In the undersea tunnel exhibit, visitors walk in an acrylic tunnel through a tank containing 2000 tons of water. The tank includes sharks and sea turtles which swim around visitors in all directions. In an introductory first gallery, six tanks are filled with fish which are changed each season. The aquarium also features exhibits detailing the local Korean river ecosystems. The COEX Aquarium also features several smaller exhibits, many with a focus on entertaining children. One such exhibit, titled "Wonderland", contains a collection of "eccentric fish tanks" including a shower cubicle, computer monitor, bath tub, and toilet bowl. Several exhibits specifically allow visitors to touch starfish and shellfish.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: 'https://www.coexaqua.com/', 
  // displayMap: String, 
}, 
{
  name: 'Hongdae Shopping Street',
  photo: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/6f/7b/71/photo6jpg.jpg?w=1200&h=-1&s=1',
  address: '365-8 Seogyo-dong',
  area: 'Mapo-gu',
  description: `Hongdae (Korean: 홍대) is a neighborhood in Seoul, South Korea near Hongik University, after which it is named. It is known for its urban arts and indie music culture, local shops, clubs and entertainment. The area is located in Mapo-gu in the western end of Seoul, stretching from Seogyo-dong to Hapjeong-dong.`,
  recommended: true,
  // openningHours: none,
  // officialWebsite: none, 
  // displayMap: String, 
},  
{
  name: 'Lotte World Seoul',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/47/2944647_image2_1.bmp',
  address: '240 Olympic-ro',
  area: 'Songpa-gu / Sincheon-dong',
  description: `Lotte World is a major recreation complex in Seoul, South Korea. It consists of a large indoor theme park, an outdoor amusement park called "Magic Island", an artificial island inside a lake linked by monorail, shopping malls, a luxury hotel, a Korean folk museum, sports facilities, and movie theaters. Opened on July 12, 1989, Lotte World receives 7.3 million visitors each year. Lotte World is located in Sincheon-dong, Songpa-gu, Seoul, South Korea. It is made up of two main sections, the outdoor amusement park Magic Island, and Adventure (indoors). Lotte World is open all year long without any holiday closings and has operating hours from 9 am to 11 pm.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: https://adventure.lotteworld.com/eng/main/index.do, 
  // displayMap: String, 
},  
{
  name: 'Yongma Land',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/47/2944647_image2_1.bmp',
  address: '118 Mangu-ro 70-gil',
  area: 'Jungnang-gu / Yongmasan',
  description: `Yongma Land opened in 1980 as a family-friendly amusement park.Yongma Land was a popular location for local families for the first decade after it opened. However, when Lotte World opened in 1989, people lost interest in the smaller Yongma Land. The park was renovated in 1995, with new attractions added. The park officially ceased operation in 2011 after the city revoked their license. Rides in the park included a carousel, bumper cars, and an octopus-themed ride. hough it is no longer operating as an amusement park, the area continues to attract about 50 to 60 visitors each day, such as urban explorers, cosplayers, photographers, and professionals in the video production industries. The current owner of the property allows visitors for a small fee. Money collected from visitor fees allows the owner to maintain arrested decay in the park. Several television shows have filmed at the park, including Cafe Minamdang, Heartless City, and Sisyphus: The Myth. K-pop group Crayon Pop and singer Baek Ji-young have used the park for music videos.`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: https://adventure.lotteworld.com/eng/main/index.do, 
  // displayMap: String, 
},  
{
  name: 'Tongin Market',
  photo: 'https://tongglobalcdn.visitkorea.or.kr/cms/resource/47/2944647_image2_1.bmp',
  address: '18 Jahamun-ro 15-gil',
  area: 'Jongno-gu',
  description: `Traditional Korean Market where you can eat delicious food`,
  recommended: true,
  // openningHours: [{String}],
  // officialWebsite: https://adventure.lotteworld.com/eng/main/index.do, 
  // displayMap: String, 
}]

mongoose
  .connect(MONGO_URI)
  .then(async (x) => {
    try {
      const dbName = x.connections[0].name
      console.log(`Connected to Mongo! Database name: "${dbName}"`)
      await Place.deleteMany()
      await Place.create(places)
      await mongoose.disconnect()
      console.log('Disconnected after creating places')
    } catch (error) {
      console.error(error)
    }
  })
  .catch((err) => {
    console.error('Error connecting to mongo: ', err)
  })