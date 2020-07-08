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

// GET api/search/lsit
exports.list = async (req, res) => {
  const data = [];
  const page = req.query.page;
  const keyword = req.query.keyword;
  let errcnt = 0;
  console.log("랭크 검색/검색어: " + keyword + " 페이지: " + page);
  // webdriver 실행
  let driver = await loadSelenium();
  // 예외처리를 위한 반복문 실행
  do {
    try {
      // webdriver 타겟 사이트 접속
      await driver.get(
        `https://store.naver.com/restaurants/list?page=${page}&query=${keyword}`
      );
      // .list_item_inner를 찾을때 까지 5000ms wait
      await driver.wait(
        until.elementLocated(By.className("list_item_inner")),
        5000
      );
      // 총 업소 수 파싱
      let total = await driver
        .findElement(By.xpath("//em[@class='count']"))
        .getText();
      total = total.replace(",", "");
      const result = await driver.findElements(By.className("list_item_inner"));
      // 데이터 파싱 비동기 loop 병렬적 처리 함수
      async function getRank(result) {
        const promises = result.map(async (item) => {
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
          // 파싱된 요소 배열에 추가
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
      // 정상 response
      await getRank(result);
      res.status(200).json({
        result: "ok",
        page: total,
        data,
      });
      break;
    } catch (error) {
      errcnt += 1;
      console.log("retry getting rank post");
    }
    // 5번 초과시 error 발생 response
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

//GET /api/search/tour
exports.tour = async (req, res) => {
  const data = [];
  const page = req.query.page;
  const city = req.query.city;
  const category = req.query.category;
  const order = req.query.order;
  console.log(
    "여행 랭크 검색/검색어: 도시=" +
      city +
      " 카테고리=" +
      category +
      " 정렬순=" +
      order +
      " 페이지: " +
      page
  );
  // webdriver 실행
  let driver = await loadSelenium();
  // 예외처리를 위한 반복문 실행
  try {
    // webdriver 타겟 사이트 접속
    await driver.get(
      `https://www.korearank.com/tour/tour_list.php?&pagenum=${page}type=12&addcode=${city}&category=${category}&orderby=${order}`
    );
    // table을 찾을 때 까지 3000ms wait
    await driver.wait(until.elementLocated(By.tagName("table")), 3000);

    const result = await driver.findElements(
      By.xpath("//div[@id='body_main']/table[1]/tbody[1]/tr[1]/td[1]/table")
    );
    // 데이터 파싱 비동기 loop 병렬적 처리 함수
    async function getTourRank(result) {
      const promises = result.map(async (item) => {
        // 이미지 부분
        let img = "";
        try {
          img = await item.findElement(By.tagName("img")).getAttribute("src");
        } catch (error) {
          console.log(error);
        }
        if (img.includes("pc_noimg")) {
          img = "";
        }

        // 링크 부분
        let link = "";
        try {
          link += await item
            .findElement(By.xpath("tbody/tr[1]//td[1]//a"))
            .getAttribute("href");
        } catch (e) {}
        // 업소 이름 부분
        const title = await item.findElement(By.tagName("b")).getText();
        // 카테고리 부분
        let category = [];
        try {
          const temp = await item
            .findElement(By.xpath("tbody/tr[2]/td[1]/a[1]/font[1]"))
            .getText();
          category = temp.replace("분류 : ", "");
        } catch (error) {
          console.log(error);
        }
        // 주소 부분
        let address = "";
        try {
          const temp = await item
            .findElement(By.xpath("tbody/tr[3]/td[1]/font[1]"))
            .getText();
          address = temp.replace("주소 : ", "");
        } catch (error) {
          console.log(error);
        }
        // 콘텐츠 부분
        let content = "";
        try {
          content = await item.findElement(By.tagName("span")).getText();
        } catch (error) {
          console.log(error);
        }

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
    }
    await getTourRank(result);
    // data가 없으면 에러 처리 response
    if (data.length === 0) {
      console.log("End of Page");
      res.status(400).json({
        error: "End of Page",
      });
      return;
    }
    res.status(200).json({
      result: "ok",
      data,
    });
    console.log("done");
  } catch (error) {
    // 페이지의 끝 response
    console.log("End of Page");
    res.status(400).json({
      error: "bad requset",
    });
  } finally {
    // webdriver 종료
    await driver.quit();
  }
};
