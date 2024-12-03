import React, { useEffect, useState } from "react";
import { fetchMenu } from "../api/menu";
import WontonItem from "../components/WontonItem";
import SideItem from "../components/SideItem";
import { MenuItem } from "../types";

const Order: React.FC = () => {
  const [wontons, setWontons] = useState<MenuItem[]>([]);
  const [dips, setDips] = useState<MenuItem[]>([]);
  const [drinks, setDrinks] = useState<MenuItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: { items: MenuItem[] } = await fetchMenu();

        const wontonItems = data.items.filter((item) => item.type === "wonton");
        const dipItems = data.items.filter((item) => item.type === "dip");
        const drinkItems = data.items.filter((item) => item.type === "drink");

        setWontons(wontonItems);
        setDips(dipItems);
        setDrinks(drinkItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="text-snow w-full max-w-screen-sm text-shadow">
      <div className="flex flex-col gap-4 container w-[90%]">
        <div className="w-full">
          <h2 className="text-[32px] leading-9 font-bold">MENY</h2>
        </div>

        {/* WONTONS */}
        <section className="w-full">
          <div className="grid grid-cols-1 m-0 w-[92%]">
            {wontons.map((item) => (
              <WontonItem
                key={item.id}
                id={item.id}
                name={item.name}
                ingredients={item.ingredients || []}
                price={item.price}
              />
            ))}
          </div>
        </section>

        {/* DIP */}
        <section className="w-full bg-clay rounded-lg">
          <div className="grid grid-cols-1 p-4">
            <div className=" w-full flex mb-4">
              <h2 className="text-2xl font-bold ">DIPSÅS</h2>
              <span className="flex-1 border-b-2 border-t-0 border-x-0 border-dotted p-2"></span>
              <p className="font-bold text-xl">19 SEK</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {dips.map((item) => (
                <SideItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type="dip"
                  price={item.price}
                />
              ))}
            </div>
          </div>
        </section>

        {/* DRYCK */}
        <section className="w-full bg-clay rounded-lg">
          <div className="grid grid-cols-1 p-4">
            <div className=" w-full flex mb-4">
              <h2 className="text-2xl font-bold ">DRYCK</h2>
              <span className="flex-1 border-b-2 border-t-0 border-x-0 border-dotted p-2"></span>
              <p className="font-bold text-xl">19 SEK</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {drinks
                .sort((a, b) => {
                  const order = [
                    "fanta orange",
                    "fanta exotic",
                    "coca cola",
                    "sprite",
                    "loka granatäpple",
                    "loka citrus",
                  ];
                  return (
                    order.indexOf(a.name.toLowerCase()) -
                    order.indexOf(b.name.toLowerCase())
                  );
                })
                .map((item) => (
                  <SideItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    type="drink"
                    price={item.price}
                  />
                ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Order;
