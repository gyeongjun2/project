
window.addEventListener('DOMContentLoaded', event => {

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector('#mainNav');
  if (mainNav) {
      new bootstrap.ScrollSpy(document.body, {
          target: '#mainNav',
          offset: 74,
      });
  };
  
  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector('.navbar-toggler');
  const responsiveNavItems = [].slice.call(
      document.querySelectorAll('#navbarResponsive .nav-link')
  );
  responsiveNavItems.map(function (responsiveNavItem) {
      responsiveNavItem.addEventListener('click', () => {
          if (window.getComputedStyle(navbarToggler).display !== 'none') {
              navbarToggler.click();
          }
      });
  });
  
  });
  
  
  
  function updateCampInfo() {
    $.ajax({
      url: "http://13.124.76.164:8000/sites/",
      method: "GET",
      dataType: "json",
      success: function (data) {
        campData = data; // 데이터를 campData에 저장
        loadMoreItems(); // 데이터를 받아오면 아이템을 미리 로드
      },
      error: function () {
        console.error("캠프 정보를 불러오는데 실패하였습니다.");
      }
    });
  }
  
  // 초기 데이터를 불러오기 위해 updateCampInfo 함수를 최초로 호출합니다.
  updateCampInfo();
  
  
  setInterval(updateCampInfo, 10000); // 10000 밀리초 = 10초
  
  
  $("#loadMoreButton").on("click", function () {
  loadMoreItems();
  });
  
  let currentPage = 1;
  const itemsPerPage = 30;
  
  function loadMoreItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const filteredData = campData.filter(item => item.target === currentContent);
  
    for (let i = startIndex; i < endIndex && i < filteredData.length; i++) {
      const newItem = createNewItem(filteredData[i]);
      $("#contentWrapper").append(newItem);
    }
  
    currentPage++;
  }
  
  function createNewItem(item) {
    const newItem = `
      <div class="content-item">
        <div class="camp-card">
          <div class="camp-info">
            <div>
              <a href="/" target="_blank">
                <h5 class="camp-title">${item.target}</h5>
              </a>
            </div>
            <div class="hidden sm:block">
              <div>
                <p class="font-bold">
                  <span>${item.title}</span>
                </p>
              </div>
              <div>
                <p class="camp-date">${item.date}</p>
              </div>
              <div class="apply-btn">
                <a class="apply-btn-link" href="${item.url}" target="_blank">
                  신청하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  
    return newItem;
  }
  
  // 페이지가 로드되면 처음 30개의 아이템을 로드합니다.
  
  
  
  var contentMap = {
  '고령층': ' ',
  '장애인': ' ',
  '농어업인': ' ',
  '아동청소년': ' ',
  '중장년층': ' ',
  '취창업희망자': ' ',
  '공통': ' ',
  };
  
  var currentContent = '';
  
  function toggleText(buttonValue, containerId) {
    var container = document.getElementById(containerId);
    var contentWrapper = document.getElementById('contentWrapper');
  
    if (currentContent === buttonValue) {
      container.style.display = 'none';
      contentWrapper.innerHTML = ''; // 이전 내용 삭제
      currentContent = '';
    } else {
      var filteredData = campData.filter(item => item.target === buttonValue);
      var content = createFilteredItems(filteredData);
      contentWrapper.innerHTML = content;
      container.style.display = 'block';
      currentContent = buttonValue;
    }
  }
  
  function createFilteredItems(filteredData) {
      var content = '';
      for (var i = 0; i < filteredData.length; i++) {
          var newItem = createNewItem(filteredData[i]);
          content += newItem;
      }
      return content;
  }