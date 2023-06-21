import React, { useEffect, useState } from "react";
import { IUser, IBookAmountPriceForm } from "../interface";
import dayjs from "dayjs";
import { Button, DatePicker, Table } from "antd";
import moment from "moment/moment";
import { getBookStatistic, getUserStatistic } from "../Service/BookService";
import {
  Column,
  ColumnConfig,
  DualAxes,
  DualAxesConfig,
} from "@ant-design/plots";

import { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export function StatisticsAdminChartsView() {
  interface IStatisticsUser {
    user: IUser;
    totalConsumption: number;
    bookAmountPrices: IBookAmountPriceForm[];
  }

  interface IBookDataToDraw {
    bookTitle: string;
    amount: number;
    saleVolume: number;
  }

  interface IUserDataToDraw {
    userName: string;
    totalConsumption: number;
  }

  const [statisticsBooks, setStatisticsBooks] = useState<
    IBookAmountPriceForm[]
  >([]);
  const [statisticsUsers, setStatisticsUsers] = useState<IStatisticsUser[]>([]);
  const [bookDataToDraw, setBookDataToDraw] = useState<IBookDataToDraw[]>([]);
  // const [bookChartConfig, setBookChartConfig] = useState<DualAxesConfig>({
  //   data: [],
  //   xField: "bookTitle",
  //   yField: ["amount", "saleVolume"],
  //   geometryOptions: [
  //     {
  //       geometry: "column",
  //       color: "#5B8FF9",
  //     },
  //     {
  //       geometry: "line",
  //       color: "#5AD8A6",
  //     },
  //   ],
  // });
  const [userDateToDraw, setUserDateToDraw] = useState<IUserDataToDraw[]>([]);

  //TODO:CHANGE NOW
  const now = moment().add(1, "day").toDate(); // Convert to Date object
  const lastMonth = moment().subtract(1, "months").toDate();

  const getBookData = (beginTime: Date, endTime: Date) => {
    getBookStatistic(beginTime, endTime).then((res: IBookAmountPriceForm[]) => {
      // console.log(res);
      const newBookData = res.sort((a, b) => {
        return a.amount - b.amount;
      });
      setStatisticsBooks(newBookData);

      let newBookDataToDraw = res.map((item: IBookAmountPriceForm) => {
        return {
          bookTitle: item.book.name,
          amount: item.amount,
          saleVolume: item.price,
        };
      });
      newBookDataToDraw = newBookDataToDraw.sort((a, b) => {
        return a.amount - b.amount;
      });
      setBookDataToDraw(newBookDataToDraw);
    });
  };

  const getUserData = (beginTime: Date, endTime: Date) => {
    getUserStatistic(beginTime, endTime).then((res: IStatisticsUser[]) => {
      setStatisticsUsers(res);
      let newUserDataToDraw: IUserDataToDraw[] = res.map(
        (item: IStatisticsUser) => {
          return {
            userName: item.user.username,
            totalConsumption: item.totalConsumption,
          };
        }
      );
      newUserDataToDraw = newUserDataToDraw.sort((a, b) => {
        return a.totalConsumption - b.totalConsumption;
      });
      setUserDateToDraw(newUserDataToDraw);
    });
  };

  useEffect(() => {
    getUserData(lastMonth, now);
    getBookData(lastMonth, now);
  }, []);

  const handleBookTimeChange = (dates: any) => {
    if (dates[0] !== null && dates[1] !== null) {
      getBookData(dates[0].toDate(), dates[1].toDate());
    }
  };
  const handleUserTimeChange = (dates: any) => {
    if (dates[0] !== null && dates[1] !== null) {
    }
  };

  // const sortBookDataToDrawByAmount = () => {
  //   const newBookDataToDraw = bookDataToDraw.sort((a, b) => {
  //     return a.amount - b.amount;
  //   });
  //   setBookDataToDraw(newBookDataToDraw);
  // };
  //
  // const sortBookDataToDrawBySaleVolume = () => {
  //   const newBookDataToDraw = bookDataToDraw.sort((a, b) => {
  //     return a.saleVolume - b.saleVolume;
  //   });
  //   setBookDataToDraw(newBookDataToDraw);
  //   console.log(newBookDataToDraw);
  // };

  const [bookColumns, setBookColumns] = useState<DualAxesConfig>({
    data: [],
    xField: "bookTitle",
    yField: ["amount", "saleVolume"],
    geometryOptions: [
      {
        geometry: "column",
        color: "#5B8FF9",
      },
      {
        geometry: "line",
        color: "#5AD8A6",
      },
    ],
  });

  const [userColumns, setUserColumns] = useState<ColumnConfig>({
    data: [],
    xField: "userName",
    yField: "totalConsumption",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
      },
    },
  });

  // const BookColumns: DualAxesConfig = {
  //   data: [bookDataToDraw, bookDataToDraw],
  //   xField: "bookTitle",
  //   yField: ["amount", "saleVolume"],
  //   geometryOptions: [
  //     {
  //       geometry: "column",
  //       color: "#5B8FF9",
  //     },
  //     {
  //       geometry: "line",
  //       color: "#5AD8A6",
  //     },
  //   ],
  // };
  //
  // const UserColumns: ColumnConfig = {
  //   data: userDateToDraw,
  //   xField: "userName",
  //   yField: "totalConsumption",
  //   label: {
  //     position: "middle",
  //     style: {
  //       fill: "#FFFFFF",
  //       opacity: 0.6,
  //     },
  //   },
  // };

  // const sortBookDataByAmount = () => {
  //   const newBookData = statisticsBooks.sort((a, b) => {
  //     return a.amount - b.amount;
  //   });
  //   setStatisticsBooks(newBookData);
  //   console.log(newBookData);
  // };

  // const bookColumns: ColumnsType<IBookAmountPriceForm> = [
  //   // {
  //   //   title: "Title",
  //   //   sorter: (a, b) => a.book.name.length - b.book.name.length,
  //   //   render: (record) => <>{record.book.name}</>,
  //   // },
  //   {
  //     title: "Amount",
  //     sorter: (a, b) => a.amount - b.amount,
  //     render: (record) => <>{record.amount}</>,
  //   },
  //   {
  //     title: "Price",
  //     sorter: (a, b) => a.price - b.price,
  //     render: (record) => <>{record.price}</>,
  //   },
  // ];

  return (
    <div>
      <h1>Statistic</h1>
      <h2>Books</h2>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleBookTimeChange}
      />
      <DualAxes {...bookColumns} />
      {/*<div style={{ display: "flex" }}>*/}
      {/*  <Button onClick={sortBookDataToDrawByAmount}>Book Amount</Button>*/}
      {/*  <Button onClick={sortBookDataToDrawBySaleVolume}>*/}
      {/*    Book Sale Volume*/}
      {/*  </Button>*/}
      {/*</div>*/}
      {/*<Table*/}
      {/*  columns={bookColumns}*/}
      {/*  dataSource={statisticsBooks}*/}
      {/*  style={{ marginRight: "30px" }}*/}
      {/*/>*/}

      <h2>Users</h2>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleUserTimeChange}
      />
      <Column {...userColumns} />
    </div>
  );
}
