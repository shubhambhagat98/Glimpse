// ********************************************************************************************************************
//                                                     Start of the script
// ********************************************************************************************************************

const NEWS_API_KEY = "";

onCreateUser((p) => {
  p.userData.keyword = "";
  p.userData.source = "";
  p.userData.category = "";
  p.userData.savedArticles = [];
  p.userData.lastNewsIndex = -1;
  p.userData.openedArticle = -1;
  //     p.visual.screen = "Homescreen";
  //     console.log("inside oncreate User")
});

projectAPI.setLastNewsIndex = (p, { index }, callback) => {
  p.userData.lastNewsIndex = index;
  console.log("received index from app --> ", p.userData.lastNewsIndex);
};

projectAPI.setSavedArticles = (p, { articles }, callback) => {
  p.userData.savedArticles = articles;

  // reset last article index
  p.userData.lastNewsIndex = -1;
};

projectAPI.setOpenedArticle = (p, { index }, callback) => {
  p.userData.openedArticle = index;
  console.log("received index from app --> ", p.userData.openedArticle);
};

// onVisualState((p, state) => {
// //     if(state.values){
// //         console.log("after visual state set -->",p.visual.screen)
// //     }
//     console.log("after visual state set -->",p.visual.screen)
// })

const vHomeScreen = visual((state) => state.screen === "HomeScreen");
const vArticleDetailsScreen = visual(
  (state) => state.screen === "ArticleDetailScreen"
);

const allScreens = visual(
  (state) =>
    state.screen === "HomeScreen" ||
    state.screen === "ArticleDetailScreen" ||
    state.screen === "ArticleWebViewScreen"
);

intent(
  allScreens,
  `What does this app do?`,
  `How does this work?`,
  `What can I do here?`,
  `How should I use this?`,
  (p) => {
    p.play(
      "This is an AI powered news app. It can fetch, read and open news articles for you."
    );
  }
);

// News by source
intent(
  vHomeScreen,
  `(Give me|Show|Tell me|What|Can you|will you|Bring me) (are|get me) (the|) (news|headelines|something) $(intentIdentifier from|by) $(source* (.*))`,
  (p) => {
    let NEWS_API_URL = `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&page=1&when=24h`;

    if (p.source.value) {
      const matchedSource = getMatchedSource(p.source.value);
      console.log("matchedSource => ", matchedSource);

      NEWS_API_URL = `${NEWS_API_URL}&sources=${matchedSource}`;
      p.userData.source = matchedSource;
    }

    console.log(NEWS_API_URL);

    p.play({ command: "setIsLoading", isLoading: true });

    api.axios
      .get(NEWS_API_URL, {
        headers: {
          "x-api-key": `${NEWS_API_KEY}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        let articles = data.articles ? data.articles : null;
        if (articles === null) {
          p.play({ command: "showError", isLoading: false, isError: true });
          p.play("Sorry, please try searching from a different source.");
          return;
        }
        p.userData.savedArticles = articles;
        p.play({
          command: "newHeadlines",
          articles: p.userData.savedArticles,
          keyword: p.userData.source,
          category: "all",
          intent: "searchBySource",
          isLoading: false,
        });
        p.userData.lastNewsIndex = -1;
        p.userData.openedArticle = -1;
        p.play(
          `Here are the (latest|recent) news articles from ${p.source.value}. Would you like me to read the headlines?`
        );

        p.then(confirmation);
      })
      .catch((error) => {
        console.log(error);
        p.play({ command: "showError", isLoading: false, isError: true });
        p.play("Could not get news articles information");
      });
  }
);

const CATEGORIES = [
  "business",
  "entertainment",
  "health",
  "sport",
  "tech",
  "finance",
  "politics",
  "travel",
  "music",
  "food",
  "science",
  "gaming",
  "energy",
  "economics",
];

const CATEGORIES_INTENT =
  `${CATEGORIES.map((category) => `${category}~${category}`).join("|")} ` + `|`;

intent(
  `(types|categories|topics) (of|in) the news (now|)`,
  `What (types|categories|topics) of news do you have?`,
  reply(
    "We provide news on business, entertainment, health, sport, tech, finance, politics, travel, music, food, science, gaming, energy, economics"
  )
);

intent(
  vHomeScreen,
  `(show|what is|tell me|what's|what are|what're| bring|give me|Can you|will you) (get me|get|tell me| read me|) (the|some|) (recent|latest|) $(N news|headlines|something) (about|on) $(C~ ${CATEGORIES_INTENT}) (category|)`,
  `(show|get|bring|what me|give me|are) (the|) (recent|latest|) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`,
  (p) => {
    let NEWS_API_URL = `https://api.newscatcherapi.com/v2/latest_headlines?countries=US&lang=en&page=1&when=24h`;

    if (p.C.value) {
      NEWS_API_URL = `${NEWS_API_URL}&topic=${p.C.value.toLowerCase()}`;
      p.userData.category = p.C.value;
    }

    console.log(NEWS_API_URL);
    p.play({ command: "setIsLoading", isLoading: true });
    api.axios
      .get(NEWS_API_URL, {
        headers: {
          "x-api-key": `${NEWS_API_KEY}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        let data = response.data;
        let articles = data.articles ? data.articles : null;
        if (articles === null) {
          p.play({ command: "showError", isLoading: false, isError: true });
          p.play("Sorry, please try searching from a different category.");
          return;
        }
        p.userData.savedArticles = articles;
        p.userData.lastNewsIndex = -1;
        p.userData.openedArticle = -1;

        if (p.C.value) {
          p.play({
            command: "newHeadlines",
            articles: p.userData.savedArticles,
            keyword: p.userData.category,
            category: p.userData.category,
            intent: "searchByCategory",
            isLoading: false,
          });
          p.play(
            `Here are the (latest|recent) news articles about ${p.C.value}. Would you like me to read the headlines?`
          );
        } else {
          p.play({
            command: "newHeadlines",
            articles: p.userData.savedArticles,
            keyword: "",
            category: "all",
            intent: "defaultSearch",
          });
          p.play(
            `Here are the (latest|recent) news articles. Would you like me to read the headlines?`
          );
        }

        p.then(confirmation);
      })
      .catch((error) => {
        console.log(error);
        p.play({ command: "showError", isLoading: false, isError: true });
        p.play("Could not get news articles information");
      });
  }
);

// News by keyword
intent(
  vHomeScreen,
  "what's up with $(keyword* (.*))",
  `(Give me|Show|Tell me|What|Can you|will you) (get me|get|tell me|) (the|) (latest|) (news|headelines|something) (about|on)  $(keyword* (.*))`,
  (p) => {
    let NEWS_API_URL = `https://api.newscatcherapi.com/v2/search?countries=US&lang=en&page=1`;

    if (p.keyword.value) {
      NEWS_API_URL = `${NEWS_API_URL}&q="${p.keyword.value}"`;
      p.userData.keyword = p.keyword.value;
    }
    p.play({ command: "setIsLoading", isLoading: true });
    api.axios
      .get(NEWS_API_URL, {
        headers: {
          "x-api-key": `${NEWS_API_KEY}`,
        },
      })
      .then((response) => {
        //             console.log(response.data);
        let data = response.data;
        let articles = data.articles ? data.articles : null;
        if (articles === null) {
          p.play({ command: "showError", isLoading: false, isError: true });
          p.play("Sorry, please try searching for something else.");
          return;
        }
        p.userData.savedArticles = articles;
        p.play({
          command: "newHeadlines",
          articles: p.userData.savedArticles,
          keyword: p.userData.keyword,
          category: "all",
          intent: "searchByKeyword",
          isLoading: false,
        });
        p.userData.lastNewsIndex = -1;
        p.userData.openedArticle = -1;
        p.play(
          `Here are the (latest|recent) news articles about ${p.keyword.value}. Would you like me to read the headlines?`
        );

        p.then(confirmation);
      })
      .catch((error) => {
        console.log(error);
        p.play({ command: "showError", isLoading: false, isError: true });
        p.play("Could not get news articles information");
      });
  }
);

intent(
  vHomeScreen,
  "(Continue|resume) reading (news|atricles|headlines|)",
  "Read (me|) (the|) (news|headlines|articles)",
  (p) => {
    console.log("inside continue last index", p.userData.lastNewsIndex);
    readHeadlines(p);
  }
);

const continueReading = context(() => {
  intent("(yes|yeah|yep|sure|okay|absolutely)", (p) => {
    return p.resolve("yes");
  });

  intent("(no|nope|nah|no thank you)", (p) => {
    return p.resolve("no");
  });
});

const confirmation = context(() => {
  intent("(yes|yeah|yep|sure|okay|absolutely)", async (p) => {
    readHeadlines(p);
  });

  intent("(no|nope|nah|no thank you)", (p) => {
    p.play("(Sure|Okay), sounds good to me.");
  });
});

const readHeadlines = async (p) => {
  console.log("last index:", p.userData.lastNewsIndex);
  let savedArticles = p.userData.savedArticles;
  for (let i = p.userData.lastNewsIndex + 1; i < savedArticles.length; i++) {
    //             p.userData.lastNewsIndex = i+1
    p.play({ command: "highlight", article: savedArticles[i], number: i });
    await p.play(`${savedArticles[i].title}`);
    if ((i + 1) % 4 === 0) {
      p.play("Do you want me to continue reading?");
      let answer = await p.then(continueReading);
      if (answer === "no") {
        p.userData.lastNewsIndex = i;
        p.play({ command: "deHighlight" });
        p.play("(Sure|Okay), sounds good to me.");
        break;
      }
    }
  }
};

const wordRegex = "\\w+";

intent(
  vHomeScreen,
  `Open (the|) $(number* ${wordRegex}) $(intentIdentifier article|news)`,
  "Open (the|) (news|) $(intentIdentifier article) (number |) $(number* (.*))",
  (p) => {
    let savedArticles = p.userData.savedArticles;
    if (
      p.number.value &&
      savedArticles.length !== 0 &&
      p.number.value.toLowerCase() !== "complete"
    ) {
      p.play({
        command: "openArticleDetails",
        number: p.number.value,
        articles: savedArticles,
      });
    } else {
      p.play("I am sorry, I can't do that.");
    }
  }
);

intent(
  vArticleDetailsScreen,
  "Open (the|) $(intendIdentifier complete|full) (news|) article",
  (p) => {
    let savedArticles = p.userData.savedArticles;
    let openedArticle = p.userData.openedArticle;

    p.play({
      command: "openArticleWebView",
      number: openedArticle,
      article: savedArticles[openedArticle],
    });
  }
);

intent(
  "(please|)(go|) back (again|)",
  "(please|) take me (to|) (the|) (back|previous) (screen|page)",
  (p) => {
    let screen = p.visual.screen;
    console.log(screen);

    if (screen === "HomeScreen") {
      p.play("You are already on the homescreen.");
    } else {
      p.play("Sure, going back.");
      p.play({ command: "goBack" });
    }
  }
);

intent("go (back|) to (the|) (main|home) (screen|page) ", (p) => {
  let screen = p.visual.screen;
  console.log(screen);

  if (screen === "HomeScreen") {
    p.play("You are already on the homescreen.");
  } else {
    p.play("Sure, going back.");
    p.play({ command: "goBackToHomeScreen" });
  }
});

intent("Open (Alan|) $(I Walkthrough|Guidelines)", (p) => {
  p.play(`Opening Alan ${p.I.value}`);
  p.play({ command: "openWalkthrough" });
});

intent("stop", (p) => {
  p.play({ command: "stop" });
});

const getSourceIndex = (input) => {
  const newInput = input.toLowerCase().replace(/ /g, "").split(".")[0];
  return Sources.findIndex((s) => s.toLowerCase().split(".")[0] === newInput);
};

const getMatchedSource = (input) => {
  const index = getSourceIndex(input);
  if (index === -1) {
    return input;
  } else {
    return Sources[index];
  }
};

const Sources = [
  "yahoo.com",
  "dailypolitical.com",
  "marketscreener.com",
  "slatersentinel.com",
  "modernreaders.com",
  "themarketsdaily.com",
  "transcriptdaily.com",
  "dakotafinancialnews.com",
  "rivertonroll.com",
  "wkrb13.com",
  "mayfieldrecorder.com",
  "dispatchtribunal.com",
  "iheart.com",
  "theenterpriseleader.com",
  "thestockobserver.com",
  "com-unik.info",
  "thelincolnianonline.com",
  "thecerbatgem.com",
  "tickerreport.com",
  "prnewswire.com",
  "seekingalpha.com",
  "si.com",
  "usatoday.com",
  "patch.com",
  "einpresswire.com",
  "americanbankingnews.com",
  "cbsnews.com",
  "socialnews.xyz",
  "bignewsnetwork.com",
  "houstonchronicle.com",
  "bloomberg.com",
  "sfgate.com",
  "chron.com",
  "apnews.com",
  "sfchronicle.com",
  "timesunion.com",
  "expressnews.com",
  "lmtonline.com",
  "beaumontenterprise.com",
  "theintelligencer.com",
  "greenwichtime.com",
  "myplainview.com",
  "ourmidland.com",
  "myjournalcourier.com",
  "mysanantonio.com",
  "ctpost.com",
  "michigansthumb.com",
  "middletownpress.com",
  "mrt.com",
  "newstimes.com",
  "bizjournals.com",
  "nhregister.com",
  "stamfordadvocate.com",
  "thehour.com",
  "seattlepi.com",
  "sheltonherald.com",
  "miragenews.com",
  "thetelegraph.com",
  "theridgefieldpress.com",
  "bigrapidsnews.com",
  "manisteenews.com",
  "registercitizen.com",
  "milfordmirror.com",
  "ncadvertiser.com",
  "tmcnet.com",
  "darientimes.com",
  "financialcontent.com",
  "wiltonbulletin.com",
  "lakecountystar.com",
  "theheraldreview.com",
  "trumbulltimes.com",
  "tellerreport.com",
  "reuters.com",
  "nasdaq.com",
  "benzinga.com",
  "washingtonpost.com",
  "forbes.com",
  "globenewswire.com",
  "reddit.com",
  "screenrant.com",
  "marketwatch.com",
  "localnews8.com",
  "ktvz.com",
  "the-sun.com",
  "shorenewsnetwork.com",
  "forextv.com",
  "businessinsider.com",
  "miamiherald.com",
  "startribune.com",
  "gossipbucket.com",
  "kion546.com",
  "foxnews.com",
  "freerepublic.com",
  "kesq.com",
  "wftv.com",
  "abc17news.com",
  "kyma.com",
  "wsbtv.com",
  "nbcsports.com",
  "ajc.com",
  "express-press-release.net",
  "wtop.com",
  "republicworld.com",
  "nypost.com",
  "kansascity.com",
  "seattletimes.com",
  "cnbc.com",
  "i3investor.com",
  "clickondetroit.com",
  "businesswire.com",
  "marketnews.com",
  "nj.com",
  "kvia.com",
  "wral.com",
  "theepochtimes.com",
  "bollyinside.com",
  "wpxi.com",
  "krdo.com",
  "sandiegouniontribune.com",
  "whio.com",
  "daytondailynews.com",
  "imdb.com",
  "actionnewsjax.com",
  "mymotherlode.com",
  "wn.com",
  "go.com",
  "expressdigest.com",
  "boston25news.com",
  "wsoctv.com",
  "krmg.com",
  "thehill.com",
  "wgnradio.com",
  "wsbradio.com",
  "wgauradio.com",
  "kdvr.com",
  "keyt.com",
  "federalnewsnetwork.com",
  "kiro7.com",
  "nytimes.com",
  "fox23.com",
  "wokv.com",
  "kob.com",
  "theathletic.com",
  "fox13memphis.com",
  "msn.com",
  "cnn.com",
  "elpasoinc.com",
  "gazettextra.com",
  "guernseypress.com",
  "chicagotribune.com",
  "wfla.com",
  "prweb.com",
  "jdsupra.com",
  "newsweek.com",
  "people.com",
  "gazette.com",
  "krqe.com",
  "aol.com",
  "fool.com",
  "news24.com",
  "dnyuz.com",
  "heavy.com",
  "airdrietoday.com",
  "latimes.com",
  "news10.com",
  "swoknews.com",
  "ptinews.com",
  "bostonglobe.com",
  "dailymagazine.news",
  "kxan.com",
  "fourstateshomepage.com",
  "washingtonexaminer.com",
  "abnewswire.com",
  "mondaq.com",
  "shawlocal.com",
  "wnyt.com",
  "keloland.com",
  "news4jax.com",
  "piquenewsmagazine.com",
  "wsj.com",
  "clickorlando.com",
  "local10.com",
  "breitbart.com",
  "journal-news.com",
  "whec.com",
  "thespun.com",
  "wric.com",
  "caledonianrecord.com",
  "triblive.com",
  "wkbn.com",
  "tribunecontentagency.com",
  "wavy.com",
  "cleveland.com",
  "yourcentralvalley.com",
  "wegotthiscovered.com",
  "cnbctv18.com",
  "everythinglubbock.com",
  "google.com",
  "sootoday.com",
  "wsav.com",
  "wsls.com",
  "ktar.com",
  "kget.com",
  "khon2.com",
  "ktsm.com",
  "wnct.com",
  "erienewsnow.com",
  "law360.com",
  "newsmax.com",
  "click2houston.com",
  "wtmj.com",
  "wtnh.com",
  "foxsports.com",
  "pix11.com",
  "wvnstv.com",
  "cbs42.com",
  "springfieldnewssun.com",
  "wowktv.com",
  "ourquadcities.com",
  "cw39.com",
  "hellomagazine.com",
  "masslive.com",
  "mercurynews.com",
  "ozarksfirst.com",
  "texomashomepage.com",
  "woodtv.com",
  "news12.com",
  "myarklamiss.com",
  "baynews9.com",
  "variety.com",
  "washingtontimes.com",
  "mlive.com",
  "ny1.com",
  "bloomberglaw.com",
  "wate.com",
  "wfin.com",
  "fox4kc.com",
  "kake.com",
  "ksat.com",
  "cnet.com",
  "pennlive.com",
  "valleycentral.com",
  "kark.com",
  "mypanhandle.com",
  "wwlp.com",
  "ksnt.com",
  "pledgetimes.com",
  "postregister.com",
  "rochesterfirst.com",
  "monstersandcritics.com",
  "mytwintiers.com",
  "wbtw.com",
  "wgno.com",
  "who13.com",
  "galvnews.com",
  "wtrf.com",
  "barrietoday.com",
  "kaaltv.com",
  "wcia.com",
  "wkrn.com",
  "koin.com",
  "cbs17.com",
  "kxnet.com",
  "wlns.com",
  "al.com",
  "hercampus.com",
  "orilliamatters.com",
  "syracuse.com",
  "dailyvoice.com",
  "detroitnews.com",
  "castanet.net",
  "rawstory.com",
  "state-journal.com",
  "usf.edu",
  "wkrg.com",
  "klcc.org",
  "news9.com",
  "postandcourier.com",
  "pressherald.com",
  "thecoldwire.com",
  "wjhl.com",
  "localsyr.com",
  "nydailynews.com",
  "wgmd.com",
  "yourbasin.com",
  "yourvalley.net",
  "dallasnews.com",
  "northwestgeorgianews.com",
  "popsugar.com",
  "wjbf.com",
  "amedpost.com",
  "dotesports.com",
  "marketbeat.com",
  "mystateline.com",
  "pahomepage.com",
  "rttnews.com",
  "deltaplexnews.com",
  "justjared.com",
  "wfmz.com",
  "yardbarker.com",
  "heritage.org",
  "meaww.com",
  "metro.us",
  "accesswdun.com",
  "collider.com",
  "etonline.com",
  "klfy.com",
  "law.com",
  "mynorthwest.com",
  "wboy.com",
  "medium.com",
  "natlawreview.com",
  "northernpublicradio.org",
  "wgntv.com",
  "abc27.com",
  "cheatsheet.com",
  "denverpost.com",
  "foxbusiness.com",
  "espn.com",
  "siouxlandproud.com",
  "wfmj.com",
  "wlwt.com",
  "axios.com",
  "draftkings.com",
  "huffpost.com",
  "kfor.com",
  "newsheater.com",
  "world-today-news.com",
  "bleacherreport.com",
  "boisestatepublicradio.org",
  "charlotteobserver.com",
  "knowyourmeme.com",
  "nme.com",
  "thestreet.com",
  "binghamtonhomepage.com",
  "dailycaller.com",
  "indexjournal.com",
  "upi.com",
  "barrons.com",
  "sportingnews.com",
  "wdtn.com",
  "wvxu.org",
  "naijanews.com",
  "wsiu.org",
  "bgdailynews.com",
  "columbian.com",
  "nprillinois.org",
  "thedailybeast.com",
  "wpri.com",
  "wshu.org",
  "barstoolsports.com",
  "ign.com",
  "oann.com",
  "sky.com",
  "abc7chicago.com",
  "forexlive.com",
  "newswise.com",
  "thegamer.com",
  "wksu.org",
  "albanyherald.com",
  "fbherald.com",
  "hip2save.com",
  "juniorminingnetwork.com",
  "nbcboston.com",
  "npr.org",
  "talesbuzz.com",
  "phl17.com",
  "wvpe.org",
  "wyomingpublicmedia.org",
  "baltimoresun.com",
  "counton2.com",
  "fox16.com",
  "inquirer.com",
  "mccourier.com",
  "tristatehomepage.com",
  "uproxx.com",
  "wbaa.org",
  "wfae.org",
  "wgem.com",
  "wvtf.org",
  "yourerie.com",
  "abc7ny.com",
  "deadline.com",
  "gamesradar.com",
  "gwinnettdailypost.com",
  "insider.com",
  "kcrg.com",
  "nesn.com",
  "today.com",
  "wkzo.com",
  "wrkf.org",
  "arkansasonline.com",
  "goskagit.com",
  "hypebeast.com",
  "ketv.com",
  "myhighplains.com",
  "investmentwatchblog.com",
  "kolotv.com",
  "pressreleasepoint.com",
  "whbl.com",
  "insurancenewsnet.com",
  "kunr.org",
  "napavalleyregister.com",
  "kbbi.org",
  "macrumors.com",
  "nhpr.org",
  "pressdemocrat.com",
  "buzzfeed.com",
  "mywabashvalley.com",
  "newsday.com",
  "nola.com",
  "staradvertiser.com",
  "thegazette.com",
  "boston.com",
  "dailykos.com",
  "delawarepublic.org",
  "entrepreneur.com",
  "fox43.com",
  "koco.com",
  "ksdk.com",
  "netscape.com",
  "usnews.com",
  "wiproud.com",
  "adomonline.com",
  "azcentral.com",
  "ewrestlingnews.com",
  "hawaiipublicradio.org",
  "knau.org",
  "spectrumlocalnews.com",
  "wicz.com",
  "wishtv.com",
  "wknofm.org",
  "apr.org",
  "kgou.org",
  "newsbrig.com",
  "spectrumnews1.com",
  "talkmarkets.com",
  "wcvb.com",
  "whqr.org",
  "wjtv.com",
  "wpsu.org",
  "11alive.com",
  "abcaudio.com",
  "capeandislands.org",
  "cosmopolitan.com",
  "dailywire.com",
  "eonline.com",
  "ft.com",
  "gamepur.com",
  "kfyrtv.com",
  "kuaf.com",
  "kunm.org",
  "ky3.com",
  "mainepublic.org",
  "morningstar.com",
  "nbcchicago.com",
  "nbcmiami.com",
  "oregonlive.com",
  "oursportscentral.com",
  "techcrunch.com",
  "thenationaldesk.com",
  "upr.org",
  "wglt.org",
  "cision.com",
  "djournal.com",
  "fox44news.com",
  "iowapublicradio.org",
  "krwg.org",
  "reviewjournal.com",
  "telegraphherald.com",
  "thenationalherald.com",
  "tpr.org",
  "wkyufm.org",
  "beloitdailynews.com",
  "deseret.com",
  "hotair.com",
  "mynewsla.com",
  "politico.com",
  "theadvocate.com",
  "ualrpublicradio.org",
  "wbfo.org",
  "wmur.com",
  "wuwm.com",
  "wvnews.com",
  "9news.com",
  "billboard.com",
  "hppr.org",
  "insidermonkey.com",
  "journalreview.com",
  "kcra.com",
  "newsnationnow.com",
  "siouxcityjournal.com",
  "wamc.org",
  "wfsb.com",
  "wjct.org",
  "abqjournal.com",
  "fortune.com",
  "idahostatejournal.com",
  "ksbw.com",
  "leadertelegram.com",
  "slashfilm.com",
  "wkyc.com",
  "abc10.com",
  "cenlanow.com",
  "communityimpact.com",
  "digitaltrends.com",
  "globalsecurity.org",
  "hollywoodlife.com",
  "kalw.org",
  "kcci.com",
  "kdlg.org",
  "ksl.com",
  "ksut.org",
  "ktlo.com",
  "nbc4i.com",
  "wlky.com",
  "wusa9.com",
  "wwno.org",
  "cagle.com",
  "chattanoogan.com",
  "hoopshype.com",
  "kmbc.com",
  "krcu.org",
  "ktiv.com",
  "kvpr.org",
  "kwqc.com",
  "suntimes.com",
  "wdiy.org",
  "wsbtradio.com",
  "bleedingcool.com",
  "bostonherald.com",
  "fox59.com",
  "gjsentinel.com",
  "harrisondaily.com",
  "kbia.org",
  "kelo.com",
  "kunc.org",
  "kvue.com",
  "nj1015.com",
  "outkick.com",
  "parade.com",
  "politicalwire.com",
  "qctimes.com",
  "reflector.com",
  "tvinsider.com",
  "wilsonpost.com",
  "wtae.com",
  "wunc.org",
  "ypradio.org",
  "channel3000.com",
  "fansided.com",
  "inforum.com",
  "kasu.org",
  "kazu.org",
  "king5.com",
  "mychamplainvalley.com",
  "timesfreepress.com",
  "wdsu.com",
  "westernslopenow.com",
  "wkms.org",
  "wmra.org",
  "wpr.org",
  "wxii12.com",
  "wyso.org",
  "abc11.com",
  "fieldlevelmedia.com",
  "gonintendo.com",
  "kmuw.org",
  "kyuk.org",
  "newson6.com",
  "resetera.com",
  "wemu.org",
  "wrvo.org",
  "wvva.com",
  "wxow.com",
  "640wxsm.com",
  "8newsnow.com",
  "bangordailynews.com",
  "dailyadvance.com",
  "dvidshub.net",
  "hollywoodreporter.com",
  "hotnewhiphop.com",
  "kosu.org",
  "ksmu.org",
  "usmagazine.com",
  "wpta21.com",
  "dispatch.com",
  "gamespot.com",
  "headtopics.com",
  "icrowdnewswire.com",
  "kdll.org",
  "kenw.org",
  "ktop1490.com",
  "kvnf.org",
  "mediaite.com",
  "sbnation.com",
  "thecentersquare.com",
  "twinfinite.net",
  "wisn.com",
  "10tv.com",
  "adgully.com",
  "conchovalleyhomepage.com",
  "kpcw.org",
  "ktbs.com",
  "kwbu.org",
  "kxel.com",
  "morning-times.com",
  "southcarolinapublicradio.org",
  "whas11.com",
  "wprl.org",
  "amny.com",
  "aspenpublicradio.org",
  "conwaydailysun.com",
  "foreignaffairs.com",
  "intellasia.net",
  "kare11.com",
  "kawc.org",
  "keranews.org",
  "mashable.com",
  "nny360.com",
  "ocregister.com",
  "postbulletin.com",
  "rrvnews.com",
  "smdailyjournal.com",
  "truthdig.com",
  "waer.org",
  "wbng.com",
  "wjcl.com",
  "wyff4.com",
  "411mania.com",
  "cinemablend.com",
  "fox40.com",
  "fox8.com",
  "kcbx.org",
  "ksn.com",
  "looper.com",
  "movieweb.com",
  "rockdalenewtoncitizen.com",
  "thebatavian.com",
  "wapt.com",
  "wesh.com",
  "beckershospitalreview.com",
  "boingboing.net",
  "fortwaynesnbc.com",
  "kwtx.com",
  "nbcdfw.com",
  "nwaonline.com",
  "pantagraph.com",
  "saharareporters.com",
  "wbaltv.com",
  "wfaa.com",
  "wfxrtv.com",
  "wkar.org",
  "wlrn.org",
  "wmuk.org",
  "wtaq.com",
  "wvtm13.com",
  "wwltv.com",
  "brobible.com",
  "distractify.com",
  "hypebae.com",
  "indy100.com",
  "nbcnewyork.com",
  "newschannelnebraska.com",
  "thewrap.com",
  "upmatters.com",
  "vindy.com",
  "weaa.org",
  "wiky.com",
  "6abc.com",
  "blogspot.com",
  "centralillinoisproud.com",
  "channelstv.com",
  "fanduel.com",
  "gameranx.com",
  "goodhousekeeping.com",
  "herald-dispatch.com",
  "kwit.org",
  "mynbc5.com",
  "nationalreview.com",
  "newser.com",
  "publicradiotulsa.org",
  "qvc.com",
  "techbullion.com",
  "techradar.com",
  "whdh.com",
  "wspa.com",
  "yankton.net",
  "24-7pressrelease.com",
  "49erswebzone.com",
  "abc4.com",
  "etcanada.com",
  "fox10tv.com",
  "fox61.com",
  "fox8live.com",
  "journalnow.com",
  "koat.com",
  "moderntiredealer.com",
  "nbcconnecticut.com",
  "pagesix.com",
  "realclearpolitics.com",
  "tampabay.com",
  "townhall.com",
  "tspr.org",
  "vice.com",
  "wvpublic.org",
  "740thefan.com",
  "adweek.com",
  "bitcoinist.com",
  "fingerlakes1.com",
  "fox17online.com",
  "gpb.org",
  "hotcars.com",
  "journalstar.com",
  "kten.com",
  "larrybrownsports.com",
  "somerset-kentucky.com",
  "wcnc.com",
  "wdio.com",
  "wgal.com",
  "wpbf.com",
  "wrestlinginc.com",
  "wsau.com",
  "13newsnow.com",
  "boxden.com",
  "firstcoastnews.com",
  "kclu.org",
  "khou.com",
  "ksnblocal4.com",
  "lakegenevanews.net",
  "mtpr.org",
  "outsider.com",
  "sportsnaut.com",
  "sun-sentinel.com",
  "sunjournal.com",
  "wcsufm.org",
  "wdrb.com",
  "whig.com",
  "wqad.com",
  "coincommunity.com",
  "dailypress.com",
  "gmtoday.com",
  "gobankingrates.com",
  "hometownstations.com",
  "insidethemagic.net",
  "intheknow.com",
  "ktep.org",
  "lasvegassun.com",
  "mix929.com",
  "mymoinfo.com",
  "sheknows.com",
  "silive.com",
  "tennessean.com",
  "trib.com",
  "whiznews.com",
  "98online.com",
  "abcactionnews.com",
  "allkpop.com",
  "androidheadlines.com",
  "bpr.org",
  "bustle.com",
  "celebretainment.com",
  "fredericksburg.com",
  "kbtx.com",
  "kfgo.com",
  "kgw.com",
  "live5news.com",
  "mdjonline.com",
  "nbc12.com",
  "nickiswift.com",
  "riverbender.com",
  "telecomasia.net",
  "theday.com",
  "wboi.org",
  "webwire.com",
  "wmay.com",
  "wmtw.com",
  "wvasfm.org",
  "933thedrive.com",
  "alternet.org",
  "attackofthefanboy.com",
  "blackhillsfox.com",
  "chronicleonline.com",
  "fox5vegas.com",
  "greenvilleonline.com",
  "justthenews.com",
  "kpbs.org",
  "ktbb.com",
  "laprensalatina.com",
  "sott.net",
  "steelersdepot.com",
  "timesleader.com",
  "tncontentexchange.com",
  "wamu.org",
  "wbir.com",
  "wbtv.com",
  "wcbe.org",
  "wfsu.org",
  "wistv.com",
  "wsiltv.com",
  "wtma.com",
  "wwd.com",
  "wzzm13.com",
  "4029tv.com",
  "abccolumbia.com",
  "aithority.com",
  "brproud.com",
  "elkodaily.com",
  "fightful.com",
  "fox2detroit.com",
  "fox34.com",
  "krvs.org",
  "mor-tv.com",
  "mycentraloregon.com",
  "nbcbayarea.com",
  "nepm.org",
  "okmagazine.com",
  "sdpb.org",
  "surreynowleader.com",
  "twincities.com",
  "wabx.net",
  "wgrz.com",
  "wltx.com",
  "wtsp.com",
  "wuwf.org",
  "12news.com",
  "adn.com",
  "courant.com",
  "heraldcourier.com",
  "informnny.com",
  "investorplace.com",
  "kait8.com",
  "kens5.com",
  "morganton.com",
  "myfox8.com",
  "qconline.com",
  "thebrunswicknews.com",
  "theverge.com",
  "u.today",
  "wbur.org",
  "wdez.com",
  "wnd.com",
  "wthr.com",
  "wymt.com",
  "actionnetwork.com",
  "bigcountryhomepage.com",
  "carscoops.com",
  "cbs58.com",
  "footwearnews.com",
  "fox32chicago.com",
  "freep.com",
  "fremonttribune.com",
  "pbs.org",
  "phillytrib.com",
  "rollingstone.com",
  "techtimes.com",
  "thewillnigeria.com",
  "wtol.com",
  "artesianews.com",
  "comingsoon.net",
  "dualshockers.com",
  "fadeawayworld.net",
  "kios.org",
  "kptv.com",
  "krem.com",
  "kuac.org",
  "laconiadailysun.com",
  "neogaf.com",
  "nptelegraph.com",
  "psu.edu",
  "timescolonist.com",
  "wdam.com",
  "westernjournal.com",
  "wttf.com",
  "wxyz.com",
  "abc7.com",
  "aviationweek.com",
  "barchart.com",
  "blackenterprise.com",
  "capradio.org",
  "clintonherald.com",
  "fox5atlanta.com",
  "gizmodo.com",
  "godanriver.com",
  "goodmenproject.com",
  "kltv.com",
  "news5cleveland.com",
  "newscentermaine.com",
  "prairiepublic.org",
  "therealdeal.com",
  "turnto23.com",
  "wbko.com",
  "wfmynews2.com",
  "wgcu.org",
  "wixx.com",
  "wqcs.org",
  "247sports.com",
  "agriculture.com",
  "androidcentral.com",
  "bgr.com",
  "brownfieldagnews.com",
  "cincinnati.com",
  "cointelegraph.com",
  "hamlethub.com",
  "knpr.org",
  "kwch.com",
  "nbcrightnow.com",
  "newsy.com",
  "orlandosentinel.com",
  "theblaze.com",
  "tmj4.com",
  "tomsguide.com",
  "wearegreenbay.com",
  "wect.com",
  "850wftl.com",
  "allaccess.com",
  "aps.org",
  "capitolfax.com",
  "cbs8.com",
  "dothaneagle.com",
  "goodmorningamerica.com",
  "healthday.com",
  "kmaj1440.com",
  "ksla.com",
  "kvoa.com",
  "mvtimes.com",
  "prothomalo.com",
  "redriverradio.org",
  "rockpapershotgun.com",
  "sciencedaily.com",
  "thefantasyfootballers.com",
  "wafb.com",
  "wispolitics.com",
  "biospace.com",
  "columbiamissourian.com",
  "cranstononline.com",
  "dailyprogress.com",
  "eagletimes.com",
  "kadn.com",
  "kdhnews.com",
  "kktv.com",
  "landline.media",
  "mcdowellnews.com",
  "tennesseestar.com",
  "thesportsdaily.com",
  "tmz.com",
  "tnledger.com",
  "wsfa.com",
  "wutc.org",
  "wyomingnews.com",
  "yourtango.com",
  "980waav.com",
  "abc57.com",
  "augustafreepress.com",
  "boredpanda.com",
  "channel4000.com",
  "dailyherald.com",
  "dennismichaellynch.com",
  "foxla.com",
  "hayspost.com",
  "hickoryrecord.com",
  "indiewire.com",
  "joblo.com",
  "jsonline.com",
  "kctv5.com",
  "ksfr.org",
  "ktvb.com",
  "kvor.com",
  "lee.net",
  "neowin.net",
  "newsradio1029.com",
  "nonpareilonline.com",
  "numberfire.com",
  "nwahomepage.com",
  "ottumwacourier.com",
  "southernminn.com",
  "time.com",
  "waff.com",
  "wane.com",
  "wjol.com",
  "wrestlezone.com",
  "wtkr.com",
  "yorknewstimes.com",
  "abc15.com",
  "americanbanker.com",
  "avclub.com",
  "butlereagle.com",
  "centralrecorder.com",
  "completesports.com",
  "dailyrecordnews.com",
  "dailyunion.com",
  "duluthnewstribune.com",
  "eurasiareview.com",
  "gadgets360.com",
  "hudsonvalley360.com",
  "insurancejournal.com",
  "kccu.org",
  "kfvs12.com",
  "kgmi.com",
  "kitv.com",
];

// ********************************************************************************************************************
//                                                     End of the script
// ********************************************************************************************************************
