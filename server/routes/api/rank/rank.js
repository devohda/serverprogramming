// selenium-webdriver 호출 밑 옵션 설정
const {
  Builder,
  By,
  Key,
  until,
  WebDriver,
  WebElement,
  Capabilities,
} = require("selenium-webdriver");
const loadSelenium = () => {
  let chromeCapabilities = Capabilities.chrome();
  let chromeOptions = {
    args: [
      "--headless",
      "--no-sandobx",
      "--window-size=800,600",
      "--disable-dev-shm-usage",
      "--unhandled-rejections=strict",
    ],
  };
  chromeCapabilities.set("chromeOptions", chromeOptions);
  return new Builder()
    .forBrowser("chrome")
    .withCapabilities(chromeCapabilities)
    .build();
};

// GET api/rank/lsit
exports.list = async (req, res) => {
  const data = [];
  const keyword = req.query.keyword;
  console.log("랭크 검색/검색어: " + keyword);
  let errcnt = 0;
  // webdriver 실행
  let driver = await loadSelenium();
  // 예외처리를 위한 반복문 실행
  do {
    try {
      // 타겟 사이트 접속
      await driver.get(
        `https://store.naver.com/restaurants/list?page=1&query=${keyword}&sortingOrder=reviewCount`
      );
      // .list_item_inner 를 찾을때 까지 4000ms wait
      await driver.wait(
        until.elementLocated(By.className("list_item_inner")),
        4000
      );
      const result = await driver.findElements(By.className("list_item_inner"));

      // 데이터 파싱 비동기 loop 병렬적 처리 함수
      async function getRank(result) {
        const promises = result.slice(0, 4).map(async (item) => {
          // 이미지 부분
          let img = "";
          try {
            img = await item.findElement(By.tagName("img")).getAttribute("src");
          } catch (error) {}
          img = img.replace("f82_82", "f150_150");
          // 링크 부분
          let link = "";
          try {
            link = await item
              .findElement(By.className("name"))
              .getAttribute("href");
          } catch (e) {}
          // 업소 이름 부분
          const title = await item
            .findElement(By.className("name"))
            .getAttribute("title");
          // 카테고리 부분
          let category = [];
          try {
            const temp = await item
              .findElement(By.className("category"))
              .getText();
            category = temp.split(",");
          } catch (error) {}
          // 주소 부분
          let address = "";
          try {
            const temp = await item
              .findElement(By.className("txt address"))
              .getText();
            address = temp.split("\n")[0];
          } catch (error) {}
          // 콘텐츠 부분
          let content = "";
          try {
            content = await item
              .findElement(By.css(".txt.ellp:not(.tv)"))
              .getText();
          } catch (error) {}

          // 리뷰 부분
          let review = 0;
          try {
            const etc = await item.findElement(By.className("etc_area ellp"));
            const tmp = await etc.findElement(By.className("item")).getText();
            review = tmp.replace("리뷰 ", "");
          } catch (error) {}

          // 태그 부분
          const tags = [];
          try {
            const tagArea = await item.findElement(By.className("tag_area"));
            const tagText = await tagArea.findElements(By.tagName("span"));
            tagText.map(async (tgs, i) => {
              const tg = await tgs.getText();
              if (tg === "") {
                return;
              }
              tags.push(tg);
            });
          } catch (error) {}

          data.push({
            title,
            content,
            category,
            address,
            img,
            link,
            review,
            tags,
          });
        });
        await Promise.all(promises);
        console.log("done");
      }
      // 정상 처리 response
      await getRank(result);
      res.status(200).json({
        result: "ok",
        data,
      });
      break;
    } catch (error) {
      errcnt += 1;
      console.log("retry getting rank post");
    }
    // error 5번 초과시 response
    if (errcnt > 5) {
      res.status(500).json({
        result: "500 server error",
      });
      break;
    }
  } while (true);
  // webdriver 종료
  await driver.quit();
};

//GET /api/rank/tour
exports.tour = async (req, res) => {
  const data = [];
  const city = req.query.city;
  const category = req.query.category;
  const order = req.query.order;
  let errcnt = 0;
  console.log(
    "여행 랭크 검색/검색어: 도시=" +
      city +
      " 카테고리=" +
      category +
      " 정렬순=" +
      order
  );
  // webdriver 실행
  let driver = await loadSelenium();
  // 예외처리를 위한 반복문 실행
  do {
    try {
      // 타겟사이트 접속
      await driver.get(
        `https://www.korearank.com/tour/tour_list.php?type=12&addcode=${city}&category=${category}&orderby=${order}`
      );
      // table 을 찾을때 까지 4000ms wait
      await driver.wait(until.elementLocated(By.tagName("table")), 4000);

      const result = await driver.findElements(
        By.xpath("//div[@id='body_main']/table[1]/tbody[1]/tr[1]/td[1]/table")
      );

      // 데이터 파싱 비동기 loop 병렬적 처리 함수
      async function getTourRank(result) {
        const promises = result.slice(0, 4).map(async (item) => {
          // 이미지 부분
          let img = "";
          try {
            img = await item.findElement(By.tagName("img")).getAttribute("src");
          } catch (error) {}
          // 링크 부분
          let link = "";
          try {
            link += await item
              .findElement(By.xpath("tbody/tr[1]//td[1]//a"))
              .getAttribute("href");
          } catch (error) {}
          // 업소 이름 부분
          const title = await item.findElement(By.tagName("b")).getText();
          // 카테고리 부분
          let category = [];
          try {
            const temp = await item
              .findElement(By.xpath("tbody/tr[2]/td[1]/a[1]/font[1]"))
              .getText();
            category = temp.replace("분류 : ", "");
          } catch (error) {}
          // 주소 부분
          let address = "";
          try {
            const temp = await item
              .findElement(By.xpath("tbody/tr[3]/td[1]/font[1]"))
              .getText();
            address = temp.replace("주소 : ", "");
          } catch (error) {}
          // 콘텐츠 부분
          let content = "";
          try {
            content = await item.findElement(By.tagName("span")).getText();
          } catch (error) {}

          data.push({
            title,
            content,
            category,
            address,
            img,
            link,
          });
        });
        await Promise.all(promises);
        console.log("done");
      }
      await getTourRank(result);
      // 정상 처리 response
      res.status(200).json({
        result: "ok",
        data,
      });
      break;
    } catch (error) {
      errcnt += 1;
      console.log("retry getting tour rank post");
    }
    // error 5번 초과시 response
    if (errcnt > 5) {
      res.status(500).json({
        result: "500 server error",
      });
      console.log("Error: End of Page / Interver Error");

      break;
    }
  } while (true);
  // webdriver 종료
  await driver.quit();
};
