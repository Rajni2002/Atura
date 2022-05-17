let colorPalette = ["#3eb502", "#008FFB", "#FEB019", "#FF4560", "#775DD0"];
buildCharts();
function buildCharts() {
  let totalExpense = [0, 0, 0, 0];

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
    savings.push(
      e -
        expenses.apparealExpense[i] +
        expenses.fgExpense[i] +
        expenses.internetExpense[i] +
        expenses.transportationExpense[i]
    );
    ++i;
  });
  let optionsBar = {
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
    labels: [
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
    ],
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
  new ApexCharts(document.querySelector("#year-expense"), optionsBar).render();

  optionsBar = {
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
        name: "Savings",
        data: savings,
      },
    ],
    labels: [
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
    ],
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
  new ApexCharts(document.querySelector("#year-saving"), optionsBar).render();

  for (let i = 0; i < 12; ++i) {
      totalExpense[0]+=expenses.apparealExpense[i];
      totalExpense[1] += expenses.fgExpense[i];
      totalExpense[2] += expenses.transportationExpense[i];
      totalExpense[3] += expenses.internetExpense[i];
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
      text: "Department Sales",
      style: {
        fontSize: "18px",
      },
    },
    series: totalExpense,
    labels: ["Appereal", "Food & Grocery", "Transportation", "Internet"],
    legend: {
      position: "left",
      offsetY: 80,
    },
  };

  new ApexCharts(document.querySelector("main .pie"), options).render();
}
