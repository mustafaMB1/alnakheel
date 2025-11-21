import {  FaShippingFast  } from "react-icons/fa";
import { MdDeliveryDining , MdPriceCheck  } from "react-icons/md";
import { SiFreecad , SiCssdesignawards  } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { ImSpinner9 } from "react-icons/im";
import { FaUsers } from "react-icons/fa6";
import {useInView} from '../useInView'
import { useTranslation } from "react-i18next";




export default function Advantages() {
    const { t } = useTranslation("home");
    const [ref, isVisible] = useInView({ threshold: 0.2 });

const steps = [
  {
    id: 1,
    title: t("Free-insallation"),
    icon: <SiFreecad className="text-white w-8 h-8" />,
  },
  {
    id: 2,
    title: t("Free-Delivery"),
    icon: <MdDeliveryDining className="text-white w-8 h-8" />,
  },
  {
    id: 3,
    title: t("Best-Prices"),
    icon: <MdPriceCheck className="text-white w-8 h-8" />,
  },
  {
    id: 4,
    title: t("Kitchen-Design-Services"),
    icon: <SiCssdesignawards  className="text-white w-8 h-8" />,
  },
  {
    id: 5,
    title: t("After-Sales-Services"),
    icon: <GrServices className="text-white w-8 h-8" />,
  },
  {
    id: 6,
    title: t("Express-Deleviry"),
    icon: <FaShippingFast className="text-white w-8 h-8" />,
  },
  {
    id: 7,
    title: t("Great-Warranty"),
    icon: <ImSpinner9 className="text-white w-8 h-8" />,
  },
  {
    id: 8,
    title: t("Customer-Service"),
    icon: <FaUsers className="text-white w-8 h-8" />,
  },
];
  return (
    <div className="w-full flex flex-col items-center px-4 py-10 bg-gray-50">
    <h2
      ref={ref}
      className={`text-2xl md:text-4xl font-bold mb-12 text-center text-[var(--main-color)] 
      transition-opacity duration-700 
      ${isVisible ? "animate-fadeUp-title" : "opacity-0"}`}
    >
      {t("Our-Advantages")}
    </h2> 

      {/* Steps in responsive grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col group   items-center bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300"
          >
            {/* Icon in circle */}
            <div className="w-20 h-20 rounded-full bg-[var(--secondary-color)] flex items-center justify-center mb-4">
              {step.icon}
            </div>

            {/* Title */}
            <h3 className="text-sm md:text-lg transition group-hover:font-[700] font-semibold text-gray-500  text-center">
              {step.id}. {step.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
