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

// GET api/random/test
exports.pick = async (req, res) => {
  const data = [];
  const keyword = req.query.keyword;
  console.log("랜덤 픽/검색어: " + keyword);
  let randomPage = 1;
  let total = 0;
  let errcnt = 0;
  // webdriver 실행
  let driver = await loadSelenium();
  // total page 크롤링
  // 예외처리를 위한 반복문 실행
  do {
    try {
      // 타겟사이트 접속
      await driver.get(
        `https://store.naver.com/restaurants/list?page=1&query=${keyword}`
      );
      // xpath //em[@class='count'] 을 찾을때 까지 5000ms wait
      await driver.wait(
        until.elementLocated(By.xpath("//em[@class='count']")),
        5000
      );
      // xpath //em[@class='count'] 파싱
      total = await driver
        .findElement(By.xpath("//em[@class='count']"))
        .getText();
      total = total.replace(",", "");
      break;
    } catch (error) {
      errcnt += 1;
      console.log("retry getting total page");
    }
    // error 5회 초가시 response
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
  errcnt = 0;
  if (Math.ceil(Number(total) / 20) >= 15) {
    randomPage = Math.floor(Math.random() * 15 + 1);
  } else {
    randomPage = Math.floor(Math.random() * Math.ceil(Number(total) / 20) + 1);
  }
  driver = await loadSelenium();

  do {
    try {
      await driver.get(
        `https://store.naver.com/restaurants/list?page=${randomPage}&query=${keyword}`
      );
      await driver.wait(
        until.elementLocated(By.className("list_item_inner")),
        5000
      );
      const result = await driver.findElements(By.className("list_item_inner"));
      const randomPost = Math.floor(Math.random() * result.length);

      // 데이터 파싱 비동기 loop 처리 함수
      async function getRandom(result) {
        // 랜덤 아이템 선택
        const item = result[randomPost];
        // 이미지 부분
        let img = "";
        try {
          img = await item.findElement(By.tagName("img")).getAttribute("src");
        } catch (error) {
          //console.log(error);
        }
        img = img.replace("f82_82", "f150_150");
        // 링크 부분
        let link = "";
        try {
          link = await item
            .findElement(By.className("name"))
            .getAttribute("href");
        } catch (error) {
          //console.log(error);
        }
        // 업소 이름 부분
        let title = "";
        try {
          title = await item
            .findElement(By.className("name"))
            .getAttribute("title");
        } catch (error) {
          //console.log(error);
        }
        // 카테고리 부분
        let category = [];
        try {
          const temp = await item
            .findElement(By.className("category"))
            .getText();
          category = temp.split(",");
        } catch (error) {
          //console.log(error);
        }
        // 주소 부분
        let address = "";
        try {
          const temp = await item
            .findElement(By.className("txt address"))
            .getText();
          address = temp.split("\n")[0];
        } catch (error) {
          //console.log(error);
        }
        // 콘텐츠 부분
        let content = "";
        try {
          content = await item.findElement(By.className("txt ellp")).getText();
        } catch (error) {
          //console.log(error);
        }
        // 리뷰 부분

        let review = 0;
        try {
          const etc = await item.findElement(By.className("etc_area ellp"));
          const tmp = await etc.findElement(By.className("item")).getText();
          review = tmp.replace("리뷰 ", "");
          if (isNaN(review)) {
            review = 0;
          }
        } catch (error) {
          //console.log(error);
        }

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
          tags,
          img,
          link,
          review,
        });
      }
      await getRandom(result);
      // 정상 처리 response
      res.status(200).json({
        result: "ok",
        data,
      });
      console.log("done");
      break;
    } catch (e) {
      errcnt += 1;
      console.log("retry getting post");
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
  await driver.quit();
};
