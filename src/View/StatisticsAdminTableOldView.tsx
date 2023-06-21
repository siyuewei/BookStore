import React, { useEffect, useState } from "react";
import { IUser, IBookAmountPriceForm } from "../interface";
import dayjs from "dayjs";
import { DatePicker, Table } from "antd";
import moment from "moment/moment";
import { getBookStatistic, getUserStatistic } from "../Service/BookService";

import { ColumnsType } from "antd/es/table";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY-MM-DD";

export function StatisticsAdminTableOldView() {
  interface IStatisticsUser {
    user: IUser;
    totalConsumption: number;
    bookAmountPrices: IBookAmountPriceForm[];
  }

  const [statisticsBooks, setStatisticsBooks] = useState<
    IBookAmountPriceForm[]
  >([]);
  const [statisticsUsers, setStatisticsUsers] = useState<IStatisticsUser[]>([]);

  const now = moment().add(1, "day").toDate(); // Convert to Date object
  const lastMonth = moment().add(1, "day").subtract(1, "months").toDate();

  const getBookData = (beginTime: Date, endTime: Date) => {
    console.log(endTime);
    getBookStatistic(beginTime, endTime).then((res: IBookAmountPriceForm[]) => {
      // console.log(res);
      const newBookData = res.sort((b, a) => {
        return a.amount - b.amount;
      });
      setStatisticsBooks(newBookData);
    });
  };

  const getUserData = (beginTime: Date, endTime: Date) => {
    getUserStatistic(beginTime, endTime).then((res: IStatisticsUser[]) => {
      const newUserData = res.sort((b, a) => {
        return a.totalConsumption - b.totalConsumption;
      });
      setStatisticsUsers(newUserData);
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
      getUserData(dates[0].toDate(), dates[1].toDate());
    }
  };

  const bookColumns: ColumnsType<IBookAmountPriceForm> = [
    {
      title: "Title",
      sorter: (b, a) => a.book.name.length - b.book.name.length,
      render: (record) => <>{record.book.name}</>,
    },
    {
      title: "Amount",
      sorter: (b, a) => a.amount - b.amount,
      render: (record) => <>{record.amount}</>,
    },
    {
      title: "Price",
      sorter: (b, a) => a.price - b.price,
      render: (record) => <>{record.price}</>,
    },
  ];

  const userColumns: ColumnsType<IStatisticsUser> = [
    {
      title: "Name",
      sorter: (b, a) => a.user.username.length - b.user.username.length,
      render: (record) => <>{record.user.username}</>,
    },
    {
      title: "Total Consumption",
      sorter: (b, a) => a.totalConsumption - b.totalConsumption,
      render: (record) => <>{record.totalConsumption}</>,
    },
  ];

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
      <Table columns={bookColumns} dataSource={statisticsBooks} />

      <h2>Users</h2>
      <RangePicker
        defaultValue={[dayjs(now), dayjs(lastMonth)]}
        format={dateFormat}
        style={{ width: "500px" }}
        onChange={handleUserTimeChange}
      />
      <Table columns={userColumns} dataSource={statisticsUsers} />
    </div>
  );
}
