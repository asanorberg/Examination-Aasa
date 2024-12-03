import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import box from "../assets/boxtop.png";
import Button from "../components/Button";

const Confirmation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // hämta order details från location state
  const orderConfirmation = location.state?.order;

  // beräkna ETA
  const calculateETA = (etaParam: string | null): string | null => {
    if (etaParam) {
      const etaDate = new Date(etaParam); //konverterar timestamp till js date object
      const currentDate = new Date(); //hämta current date + tid
      //kalkylera tidsskillnaden mellan beräknad tid och current time i minuter
      const diffInMinutes = Math.round(
        (etaDate.getTime() - currentDate.getTime()) / (1000 * 60) //millisekunder till minuter
      );

      //om tidsskillnaden är mer än 0, ge tidsskillnaden i minuter
      //annars returnera null
      return diffInMinutes > 0 ? `${diffInMinutes} MIN` : null;
    }
    return null;
  };

  const eta = calculateETA(orderConfirmation?.eta || null);

  const handleViewReceipt = () => {
    navigate("/receipt", { state: { order: orderConfirmation } });
  };

  return (
    <div className="flex flex-col text-snow w-full">
      <div>
        <img src={box} alt="Cart" className="w-[390px] h-auto mt-[97px]" />
      </div>
      <div className="flex flex-col text-center w-[326px] gap-4 mb-[42px] ">
        <h1 className="text-[32px] leading-[38.4px] font-bold">
          DINA WONTONS TILLAGAS!
        </h1>
        <p className="text-[26px] font-medium leading-[31.2px]">
          ETA {eta || "Calculating..."}
        </p>
        <p className="text-[15px] text-ash leading-[18px]">
          #{orderConfirmation?.id?.toUpperCase() || "Unknown Order"}
        </p>
      </div>
      <div className="flex flex-col w-full gap-4">
        <Button variant="outline" onClick={handleViewReceipt}>
          <div className="flex flex-col">
            <span className="text text-[22px] leading-[28.8px] text-confirmation">
              SE KVITTO{" "}
            </span>
          </div>
        </Button>

        <Button
          variant="cta"
          className="w-[358px]"
          onClick={() => navigate("/")}
        >
          GÖR EN NY BESTÄLLNING
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
