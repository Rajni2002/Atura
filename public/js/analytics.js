let colorPalette = ["#3eb502", "#008FFB", "#FEB019", "#FF4560", "#775DD0"];
buildBasicFinanceCharts();
function buildBasicFinanceCharts() {
  let expenseByCategories = [0, 0, 0, 0];
  let expenseByMonth = [];
  let labels = [
    "Jun 2021",
    "Jul 2021",
    "Aug 2021",
    "Sep 2021",
    "Oct 2021",
    "Nov 2021",
    "Dec 2021",
    "Jan 2022",
    "Feb 2022",
    "Mar 2022",
    "Apr 2022",
    "May 2022",
  ];
  let income = [
    7400,
    5000,
    5600,
    9000,
    4000,
    8900,
    5600,
    14000,
    9000,
    8500,
    2600,
    6000,
  ];
  let expenses = {
    apparealExpense: [4200, 0, 0, 0, 0, 0, 0, 0, 0, 3000, 900, 450],
    fgExpense: [
      2000,
      1800,
      1600,
      1850,
      1900,
      1900,
      1060,
      1140,
      1930,
      2330,
      1150,
      1260,
    ],
    transportationExpense: [
      800,
      650,
      500,
      1000,
      400,
      850,
      970,
      750,
      900,
      883,
      775,
      856,
    ],
    internetExpense: [0, 699, 0, 0, 599, 0, 0, 299, 0, 249, 0, 0],
  };
  let savings = [];
  let i = 0;
  income.forEach(function (e) {
    let eachMonthExpense =
      expenses.apparealExpense[i] +
      expenses.fgExpense[i] +
      expenses.internetExpense[i] +
      expenses.transportationExpense[i];
    expenseByMonth.push(eachMonthExpense);
    savings.push(e - eachMonthExpense);
    ++i;
  });
  savings;
  let options = {
    chart: {
      type: "bar",
      height: 380,
      width: "100%",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: colorPalette,
    series: [
      {
        name: "Appareal",
        data: expenses.apparealExpense,
      },
      {
        name: "Foods & grocery",
        data: expenses.fgExpense,
      },
      {
        name: "Transportation",
        data: expenses.transportationExpense,
      },
      {
        name: "Internet",
        data: expenses.internetExpense,
      },
    ],
    labels: labels,
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#78909c",
        },
      },
    },
    title: {
      text: "Yearly Expenses",
      align: "left",
      style: {
        fontSize: "18px",
      },
    },
  };
  new ApexCharts(document.querySelector("#year-expense"), options).render();

  options = {
    chart: {
      type: "line",
      height: 380,
      width: "100%",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: colorPalette,
    series: [
      {
        name: "Savings",
        data: savings,
      },
    ],
    labels: labels,
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#78909c",
        },
      },
    },
    title: {
      text: "Yearly Savings",
      align: "left",
      style: {
        fontSize: "18px",
      },
    },
  };
  new ApexCharts(document.querySelector("#year-saving"), options).render();

  for (let i = 0; i < 12; ++i) {
    expenseByCategories[0] += expenses.apparealExpense[i];
    expenseByCategories[1] += expenses.fgExpense[i];
    expenseByCategories[2] += expenses.transportationExpense[i];
    expenseByCategories[3] += expenses.internetExpense[i];
  }

  options = {
    chart: {
      type: "donut",
      width: "100%",
      height: 400,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "75%",
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined,
      },
    },
    colors: colorPalette,
    title: {
      text: "Total Expenses",
      style: {
        fontSize: "18px",
      },
    },
    series: expenseByCategories,
    labels: ["Appereal", "Food & Grocery", "Transportation", "Internet"],
    legend: {
      position: "left",
      offsetY: 80,
    },
  };
  new ApexCharts(document.querySelector("#pie-expense"), options).render();

  let totalIncome = 0;
  income.forEach(function (e) {
    totalIncome += e;
  });

  options = {
    chart: {
      type: "line",
      height: 380,
      width: "100%",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: ["#008FFB"],
    series: [
      {
        name: "Earnings",
        data: income,
      },
    ],
    labels: labels,
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#78909c",
        },
      },
    },
    title: {
      text: "Earnings - " + "₹" + totalIncome,
      align: "left",
      style: {
        fontSize: "18px",
      },
    },
  };
  new ApexCharts(document.querySelector("#earnings"), options).render();

  let totalExpense = 0;
  expenseByCategories.forEach(function (e) {
    totalExpense += e;
  });

  options = {
    chart: {
      type: "line",
      height: 380,
      width: "100%",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: ["#5564BE"],
    series: [
      {
        name: "Expenditure",
        data: expenseByMonth,
      },
    ],
    labels: labels,
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: "#78909c",
        },
      },
    },
    title: {
      text: "Expenses - " + "₹" + totalExpense,
      align: "left",
      style: {
        fontSize: "18px",
      },
    },
  };
  new ApexCharts(document.querySelector("#expenses"), options).render();
  buildAssetCharts(labels, savings);
}

function buildAssetCharts(labels, savings) {
  let totalAssests = [];
  let sum = 0;
  savings.forEach(function (e) {
    sum += e;
    totalAssests.push(sum);
  });

  let assets = {
    shares: [],
    mutualFunds: [],
    crypto: [],
    bonds: [],
  };

  totalAssests.forEach(function (e) {
    assets.shares.push(Math.trunc(0.7 * e));
    assets.mutualFunds.push(Math.trunc(0.1 * e));
    assets.crypto.push(Math.trunc(0.1 * e));
    assets.bonds.push(Math.trunc(0.1 * e));
  });
  let assetsByMonth = [0, 0, 0, 0];
  for (let i = 0; i < totalAssests.length; ++i) {
    assetsByMonth[0] = assets.shares[i];
    assetsByMonth[1] = assets.mutualFunds[i];
    assetsByMonth[2] = assets.crypto[i];
    assetsByMonth[3] = assets.bonds[i];
  }


  let options = {
    chart: {
      type: "donut",
      width: "100%",
      height: 400,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "75%",
        },
        offsetY: 20,
      },
      stroke: {
        colors: undefined,
      },
    },
    colors: colorPalette,
    title: {
      text: "Total Assets",
      style: {
        fontSize: "18px",
      },
    },
    series: assetsByMonth,
    labels: ["Stocks", "Mutual funds", "Crypto", "Bonds"],
    legend: {
      position: "left",
      offsetY: 80,
    },
  };
  new ApexCharts(document.querySelector("#pie-assets"), options).render();

  options = {
    chart: {
      type: "bar",
      height: 380,
      width: "100%",
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    colors: colorPalette,
    series: [
      {
        name: "Shares",
        data: assets.shares,
      },
      {
        name: "Mutual funds",
        data: assets.mutualFunds,
      },
      {
        name: "Crypto",
        data: assets.crypto,
      },
      {
        name: "Bonds",
        data: assets.bonds,
      },
    ],
    labels: labels,
    xaxis: {
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: true,
      },
      labels: {
        style: {
          colors: "#78909c",
        },
      },
    },
    title: {
      text: "Assets",
      align: "left",
      style: {
        fontSize: "18px",
      },
    },
  };
  new ApexCharts(document.querySelector("#invest"), options).render();
}
