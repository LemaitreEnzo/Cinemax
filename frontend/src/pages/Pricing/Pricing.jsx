import React from "react";
import { useState } from "react";
import "./pricing.css"
import { motion } from 'framer-motion';
import ScrollButton from "../../components/ScrollButton/ScrollButton";
import PricingCard from "../../components/CardPrice/CardPrice";

const Pricing = () => {
    const [selectMonthly, setSelectMonthly] = useState(true);
    console.log(selectMonthly);
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className="PricingApp">
                <div className="app-container">
                    {/* Header */}
                    <header>
                        <h1 className="header-topic title">Nos tarifs</h1>
                        <div className="header-row">
                            <p>Annually</p>
                            <label className="price-switch">
                                <input
                                    className="price-checkbox"
                                    onChange={() => {
                                        setSelectMonthly((prev) => !prev);
                                    }}
                                    type="checkbox"
                                />
                                <div className="switch-slider"></div>
                            </label>
                            <p>Monthly</p>
                        </div>
                    </header>
                    {/* Cards here */}
                    <div className="pricing-cards">
                        <PricingCard
                            title="Essential"
                            price={selectMonthly ? "20.99" : "188.9"}
                            storage="60 GB Storage"
                            users="5"
                            account="1 seul compte"
                        />
                        <PricingCard
                            title="Deluxe"
                            price={selectMonthly ? "34.99" : "349.9"}
                            storage="70 GB Storage"
                            users="10"
                            account="3 comptes maximum"
                        />
                        <PricingCard
                            title="Premium"
                            price={selectMonthly ? "79.99" : "499.9"}
                            storage="90 GB Storage"
                            users="20"
                            account="Plusieurs comptes liés"
                        />
                    </div>
                </div>
            </div>
            <ScrollButton />
        </motion.div>

    )
}

export default Pricing;