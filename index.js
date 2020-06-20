const resultList = document.querySelector(".result-list");

// Setup Search

const setupSearch = (data) => {
  if (data.length) {
    document.querySelector(".search-wrapper").style.display = "block";
    let html = "";
    data.forEach((doc) => {
      const jobs = doc.data();
      const li = `
    
    <li id="{{jobSubID}}" class="{{applyID}} vivify fadeIn delay-100 duration-100" style="text-decoration: none;list-style-type: none;">
    <a onclick="document.getElementById('jobview').style.display='block';document.getElementById('jbusiness').innerHTML='${jobs.Business}';document.getElementById('jtitle').innerHTML='${jobs.Title}';document.getElementById('jdescription').innerHTML='${jobs.Description}'">
 <div class="search-items vivify fadeIn delay-200" id="{{companyName}}"><h3>${jobs.Business}</h3>
<h4>${jobs.Title}</h4>
<p>${jobs.Description}</p>
<span style="display: none;">{{requirement}} {{location}} {{keyWords}} {{pay}}</span>
</div>
</a>

       `;
      html += li;
    });

    resultList.innerHTML = html;
  } else {
    resultList.innerHTML =
      '<div class="plan-wrapper"><div class="plan-option-container "><img class="plan-option vivify fadeIn" src="Images/free.svg"><div class="job-pane-buttons"><a href="#signup"><button>Start Job Search</button></a></div></div><div class="plan-option-container "><img class="plan-option viivfy fadeIn delay-200" src="Images/pro.svg"><div class="job-pane-buttons pro"><a href="#signup"><button>Signup</button></a></div></div></div> ';

    document.querySelector(".search-wrapper").style.display = "none";
  }
};

