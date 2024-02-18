import React from "react";
import Add from "./add";
import Image from "next/image";

function ItemCategoryRow({ category }) {
  return (
    <tr>
      <th className="bg-gray-200 p-2" colSpan="9">
        {category}
      </th>
    </tr>
  );
}

function ItemTable({ items }) {
  const rows = [];
  let lastCategory = null;

  if (items && items.length > 0) {
    items.forEach((item) => {
      if (item && item.Name) {
        if (item.Name !== lastCategory) {
          rows.push(<ItemCategoryRow key={item.Name} />);
        }
        lastCategory = item.Name;
      }
      let count = 1; // Initialize a count variable

      rows.push(
        items.map((item, index) => (
          <tr key={item.Barcode}>
            <td className="p-2 text-center">{count++}</td>
            <td className="p-2 text-center">{item.Name}</td>
            <td className="p-2 text-center">{item.Description}</td>
            <td className="p-2 text-center">{item.Quantity}</td>
            <td className="p-2 text-center">{item.Weight}</td>
            <td className="p-2 text-center">{item.Barcode}</td>
            <td className="p-2 text-center">{item.Manufacturer}</td>
            <td className="p-2 text-center">{item.MFDate}</td>
            <td className="p-2 text-center">{item.ExpDate}</td>
          </tr>
        ))
      );
    });
  }

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-blue-400 text-black">
          <th className="p-2">S no.</th>
          <th className="p-2">Item Name</th>
          <th className="p-2">Description</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Net Weight</th>
          <th className="p-2">Barcode</th>
          <th className="p-2">Manufacturer</th>
          <th className="p-2">Manufacturing Date</th>
          <th className="p-2">Expiry Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ItemBox({ list }) {
  return (
    <div className="bg-gray-400">
      <ItemTable items={list} />
    </div>
  );
}

const items = [
  {
    Name: "Biscuit",
    Description: "Biscuit",
    Quantity: "100",
    Price: "10",
    Weight: "100",
    Barcode: "123456",
    Manufacturer: "ABC",
    MFDate: "2021-01-01",
    ExpDate: "2021-12-31",
  },
];

const Topbar = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Image src="/Hac-logo.png" alt="logo" width="200" height="150" />
      {/* Adjust the width value as needed */}
    </div>
  );
};

export default function Home() {
  return (
    <React.Fragment>
      <Topbar />
      <ItemBox list={items} />
      <Add />
    </React.Fragment>
  );
}

