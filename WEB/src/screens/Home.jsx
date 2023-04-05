import React, { useEffect } from "react";
import MenuBar from "../components/MenuBar";

export default function Home() {
    useEffect(() => {
        document.title = "ByStatus - Home";
    }, []);

    const services = [{
        name: "WhatToCook - API",
        status: 0,
        history: [
            100,
            100,
            100,
            100,
            100
        ]
    },
    {
        name: "WhatToCook - DB",
        status: 1,
        history: [
            100,
            100,
            100,
            100,
            100
        ]
    },
    {
        name: "Sylkbot",
        status: 2,
        history: [
            75,
            60,
            65,
            50,
            100
        ]
    },
    {
        name: "ByTechBot",
        status: 3,
        history: [
            0,
            0,
            0,
            10,
            100
        ]
    }];

    // Green, Blue, Orange, Red
    const serviceStatusColors = ["#00B811", "#0085FF", "#FFB900", "#FF2E00"];
    const serviceStatusString = ["Opérationnel", "En maintenance", "Interruption partielle", "Panne majeure"];
    const serviceStatusTitle = ["Tout est opérationnel", "Service(s) en maintenance", "Service(s) en interruption partielle", "Service(s) en panne majeure"];

    function statusTitle() {
        let statusChecked = 0;
        for (let i = 0; i < services.length; i++) {
            if (statusChecked < services[i].status) {
                statusChecked = services[i].status;
            }
        }

        return (
            <div className="statutEncHome" style={{ backgroundColor: serviceStatusColors[statusChecked] }}>
                <p className="statutTitleHome">{serviceStatusTitle[statusChecked]}</p>
            </div>
        );
    }

    function statusDayService(service) {
        const dayServices = [];
    
        for (let i = 0; i < 60; i++) {
            let colorStatus;
            if (service.history[i] >= 80) {
                colorStatus = serviceStatusColors[0];
            } else {
                if (service.history[i] >= 30) {
                    colorStatus = serviceStatusColors[2];
                } else {
                    if (service.history[i] >= 0) {
                        colorStatus = serviceStatusColors[3];
                    }
                }
            }

            dayServices.push(
                <div key={i} className="serviceDay" style={{ flexGrow: 1, backgroundColor: colorStatus }}></div>
            );
        }
    
        return (
            <div className="listServiceDay" style={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                {dayServices}
            </div>
        );
    }

    function servicesList() {
        return services.map((service, index) => (
            <div key={index} className="service">
                <div className="serviceTitles">
                    <p className="serviceName">{service.name}</p>
                    <p className="serviceStatusNow" style={{color: serviceStatusColors[service.status]}}>{serviceStatusString[service.status]}</p>
                </div>
                {statusDayService(service)}
            </div>
        ));
    }
    
    return (
        <div>
            <MenuBar />
            {statusTitle()}
            <div className="detailsService">
                {servicesList()}
            </div>
        </div>
    );
}