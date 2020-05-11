import { Note } from 'models/Note';
export const realDummyNotes: Note[] = [
    {
        id: 'aaaaaaaaaaaaaaaaa',
        created: new Date(),
        includeWords: ['GraphQL', 'Hasura', 'Postgres'],
        search: 'GraphQL APIs for Postgres applications',
        watched: false,
        resources: [
            {
                id: 'r1_aaaaaaaaaaaaaa',
                noteId: 'aaaaaaaaaaaaaaaaa',
                state: 'fresh',
                rating: 100,
                link: 'https://en.wikipedia.org/wiki/Hasura',
                description: "he Hasura GraphQL Engine provides GraphQL APIs over new or existing Postgres databases. The Hasura Kubernetes",
                createdAt: new Date("18 Sept 2018"),
                updatedAt: new Date("1 Nov 2019"),
                writtenBy: "David Gerard",
                readingTime: 200,
                domain: "Wikipedia",
                images: [],
                relevantParagraphs: {
                    'hasura,graphql,postgres': [
                        "Hasura is a privately held software technology company that builds developer tooling products, including open source tools, backend as a service (BaaS) and platform as a service (PaaS) products.[1][2][3] The Hasura GraphQL Engine provides GraphQL APIs over new or existing Postgres databases.[4][5] The Hasura Kubernetes Platform is a managed platform for building, deploying, and managing applications on Kubernetes.[6][7] The company was founded on 2017, and has its headquarters in San Francisco, and has offices in Bangalore.[8]",
                        "In July 2018, the company announced the open source release of the Hasura GraphQL Engine to enable developers to set up GraphQL endpoints on their existing postgres applications.[19] In September 2018, the company introduced an open source event trigger system on Postgres for building serverless apps.",
                        "The Hasura GraphQL Engine provides developers with GraphQL APIs for Postgres applications.[23][24][25] The engine can be deployed on Heroku."
                    ],
                    hasura: [
                        "Prior to founding Hasura, founders Tanmai Gopal and Rajoshi Ghosh started an online food delivery platform. While building the platform, they realised that there were questions of what stack and which programmes to use. They found that they were solving some core issues like getting a C library to communicate with a Python library and integrate the best that is available, while checking app performance. This is how their startup gradually transitioned from a food delivery platform, to building tools for developers.",
                        "Hasura became a certified vendor of the Certified Kubernetes Conformance Program, which was created by The Cloud Native Computing Foundation 2018.",
                        "Hasura provides developers with a data layer, API gateway with authentication middleware, and GitOps automation for rapid deployment.[26] It also provisions Kubernetes clusters on different cloud-vendors and simplifies migration of an application from one cloud-vendor to another."
                    ],
                    'postgres,graphql': [
                        "In July 2018, the company announced the open source release to enable developers to set up GraphQL endpoints on their existing applications. In September 2018, the company introduced an open source event for building serverless apps.",
                    ]
                }
            },
            {
                id: 'r2_aaaaaaaaaaaaaa',
                noteId: 'aaaaaaaaaaaaaaaaa',
                state: 'fresh',
                rating: 50,
                link: 'https://hasura.io/blog/tagged/postgres/',
                description: "",
                createdAt: new Date("15 Sept 2018"),
                updatedAt: new Date("5 Nov 2020"),
                writtenBy: "David Gerard",
                readingTime: 300,
                domain: "Hasura.io",
                images: [],
                relevantParagraphs: {
                    'graphql,postgres,hasura': [
                        "Full Text Search with Hasura GraphQL API and Postgres",
                        "In this post, you will look at how to implement full text search with Hasura GraphQL API, leveraging some of the Postgres features and it's support for search."
                    ],
                }
            },

        ]
    },
    {
        id: 'bbbbbbbbbbbbbbb',
        created: new Date(),
        includeWords: ['Baseball', 'Phil Jackson'],
        search: 'Michael Jordan the king',
        watched: false,
        resources: [
            {
                id: 'r1_bbbbbbbbbbbbbbb',
                noteId: 'aaaaaaaaaaaaaaaaa',
                state: 'fresh',
                rating: 100,
                link: 'https://en.wikipedia.org/wiki/Phil_Jackson',
                description: "Philip Douglas Jackson (born September 17, 1945) is an American former professional ... Jackson attracted the attention of several baseball scouts. ... Michael Jordan's first retirement after the 1992–1993 season marked the end of the first ... challenge the Lakers faced was from their conference rival, the Sacramento Kings.",
                createdAt: new Date("18 Sept 2018"),
                updatedAt: new Date("1 Nov 2019"),
                writtenBy: "David Gerard",
                readingTime: 200,
                domain: "Wikipedia",
                images: [],
                relevantParagraphs: {
                    'jackson,baseball': [
                        "Jackson attended high school in Williston, North Dakota, where he played varsity basketball and led the team to a state title. He also played football, was a pitcher on the baseball team, and threw the discus in track and field competitions. The high school now has a sports complex named after him. His brother Chuck speculated years later that the three Jackson sons threw themselves passionately into athletics because it was the only time they were allowed to do what other children were doing.[11] Jackson attracted the attention of several baseball scouts. Their notes found their way to future NBA coach Bill Fitch, who had previously coached baseball, and had been doing some scouting for the Atlanta Braves. Fitch took over as head basketball coach at the University of North Dakota in the spring of 1962, during Jackson's junior year of high school."
                    ],
                    'phil jackson': [
                        'On June 9, 2014, the Knicks hired Derek Fisher as the head coach. Fisher played under Phil Jackson as a Laker and won five championships together.'
                    ]
                }
            },
            {
                id: 'r2_bbbbbbbbbbbbbbb',
                noteId: 'aaaaaaaaaaaaaaaaa',
                state: 'fresh',
                rating: 50,
                link: 'https://bleacherreport.com/articles/2888850-michael-jordan-once-opposed-phil-jacksons-triangle-offense-f-king-bulls-t',
                description: "Michael Jordan Once Opposed Phil Jackson's Triangle Offense: 'F--king Bulls--t'",
                createdAt: new Date("27 April 2020"),
                updatedAt: new Date("5 Nov 2020"),
                writtenBy: "SCOTT POLACEK",
                readingTime: 300,
                domain: "bleacherreport",
                images: ["https://img.bleacherreport.net/img/images/photos/003/865/327/hi-res-55e03f03cec8ae4f45070439d9c86f9c_crop_north.jpg?h=533&w=800&q=70&crop_x=center&crop_y=top"],
                relevantParagraphs: {
                    'phil jackson': ["Michael Jordan is heard saying multiple times on ESPN's The Last Dance documentary that he wouldn't play for another coach outside of Phil Jackson during the 1997-98 campaign.", "The fourth episode of the 10-part documentary detailed the Chicago Bulls' coaching transition from Doug Collins, who led them to the 1989 Eastern Conference Finals, to Phil Jackson prior to the 1989-90 campaign."]
                }
            },

        ]
    },
];