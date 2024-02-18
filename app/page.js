"use client";

import React from "react";
import Add from "./add";
import Image from "next/image";

function ItemCategoryRow({ category }) {
  return (
    <tr>
      <th className="bg-gray-200 p-2" colSpan="10">
        {category}
      </th>
    </tr>
  );
}

function ItemTable({ items }) {
  const rows = [];
  let lastCategory = null;
  let count = 1; // Initialize a count variable

  items.forEach((item) => {
    if (item && item.categories && item.categories.length > 0) {
      item.categories.forEach((category) => {
        if (category !== lastCategory) {
          rows.push(<ItemCategoryRow key={category} category={category} />);
        }
        lastCategory = category;
      });
    }

    rows.push(
      <tr key={item.barcode}>
        <td className="p-2 text-center">{count++}</td>
        <td className="p-2 text-center">{item.product_name}</td>
        <td className="p-2 text-center">{item.description}</td>
        <td className="p-2 text-center">{item.quantity}</td>
        <td className="p-2 text-center">{item.price}</td>
        <td className="p-2 text-center">{item.net_weight}</td>
        <td className="p-2 text-center">{item.barcode}</td>
        <td className="p-2 text-center">{item.manufacturer_brand}</td>
        <td className="p-2 text-center">{item.manufacturing_date}</td>
        <td className="p-2 text-center">{item.expiration_date}</td>
      </tr>
    );
  });

  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-blue-400 text-black">
          <th className="p-2">S no.</th>
          <th className="p-2">Item Name</th>
          <th className="p-2">Description</th>
          <th className="p-2">Quantity</th>
          <th className="p-2">Price</th>
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

const Topbar = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Image src="/Hac-logo.png" alt="logo" width="200" height="150" />
      {/* Adjust the width value as needed */}
    </div>
  );
};

export default function Home() {
  const [items, setItems] = React.useState([]);

  const handleFetchedData = (items) => {
    // Map the fetched items into the desired format
    const transformedItem = [{
      product_name: items.product_name || "",
      description: items.description || "",
      quantity: items.quantity || "",
      price: items.price || "",
      net_weight: items.net_weight || "",
      barcode: items.barcode || "",
      manufacturer_brand: items.manufacturer_brand,
      manufacturing_date: items.manufacturing_date || "",
      expiration_date: items.expiration_date || "",
    }];

    // Set the transformed items to the state
    setItems(transformedItem);
  };

  // console.log(items);

  return (
    <React.Fragment>
      <Topbar />
      <ItemBox list={items} />
      <Add onFetchData={handleFetchedData} />
    </React.Fragment>
  );
}
