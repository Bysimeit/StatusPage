import React, { useEffect, useState } from 'react';
import MenuBar from "../components/MenuBar";
import { getAllService, postNewService, updateService, deleteService } from '../api/service';
import { useSelector } from 'react-redux';

export default function Service(){
    const [services, setServices] = useState([]);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        document.title = "ByStatus - Home";
        getAllService().then((result) => {
            setServices(result);
        })
    }, [services]);

    const [showPopup, setShowPopup] = useState(false);
    const [typeDemand, setTypeDemand] = useState(0);
    const [titlePopup, setTitlePopup] = useState("");
    const [submitPopup, setSubmitPopup] = useState("");
    const [submitPopupColor, setSubmitPopupColor] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const [serviceName, setServiceName] = useState("");
    const [serviceIP, setServiceIP] = useState("");
    const [servicePort, setServicePort] = useState("");
    const [serviceStatus, setServiceStatus] = useState("");

    function handleAddService(){
        setTypeDemand(1);
        setTitlePopup("Ajouter un nouveau service");
        setSubmitPopup("Ajouter");
        setSubmitPopupColor("#00B811");
        setShowPopup(true);
    }

    function handleModifyService(){
        setTypeDemand(2);
        setTitlePopup("Modifier un service");
        setSubmitPopup("Modifier");
        setSubmitPopupColor("#0085FF");
        setShowPopup(true);
    }

    function handleDeleteService(){
        setTypeDemand(3);
        setTitlePopup("Supprimer un service");
        setSubmitPopup("Supprimer");
        setSubmitPopupColor("#FF0000");
        setShowPopup(true);
    }

    function handleClosePopup() {
        setSelectedService("");
        setServiceName("");
        setServiceIP("");
        setServicePort("");
        setServiceStatus("");
        setShowPopup(false);
    }

    const handleServiceSelection = (event) => {
        const service = services.find((s) => s.id === parseInt(event.target.value));
        setSelectedService(service.id);
        setServiceName(service.name);
        setServiceIP(service.addressip);
        setServicePort(service.port);
        setServiceStatus(service.status);
    };

    const handleServiceNameChange = (event) => {
        setServiceName(event.target.value);
    };

    const handleServiceIPChange = (event) => {
        setServiceIP(event.target.value);
    };

    const handleServicePortChange = (event) => {
        setServicePort(event.target.value);
    };

    const handleServiceStatusChange = (event) => {
        setServiceStatus(event.target.value);
    };

    async function processService() {
        if (typeDemand === 1) {
            if (serviceName === '') {
                alert("Veuillez remplir le champ : Nom du service");
            } else {
                if (serviceIP === '') {
                    alert("Veuillez remplir le champ : Adresse IP");
                } else {
                    if (servicePort === '') {
                        alert("Veuillez remplir le champ : Port");
                    } else {
                        await postNewService(serviceName, serviceIP, servicePort, user.token);
                        alert("Nouveau service ajouté avec succès !");
                        handleClosePopup()
                    }
                }
            }
        } else {
            if (typeDemand === 2) {
                if (serviceName === '') {
                    alert("Veuillez remplir le champ : Nom du service");
                } else {
                    if (serviceIP === '') {
                        alert("Veuillez remplir le champ : Adresse IP");
                    } else {
                        if (servicePort === '') {
                            alert("Veuillez remplir le champ : Port");
                        } else {
                            await updateService(selectedService, serviceName, serviceIP, servicePort, serviceStatus, user.token);
                            alert("Service mis à jour avec succès !");
                            handleClosePopup();
                        }
                    }
                }
            } else {
                if (typeDemand === 3) {
                    await deleteService(selectedService, user.token);
                    alert("Service supprimé avec succès !");
                    handleClosePopup();
                }
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        processService().catch(e => alert(e.message));
    };

    function listService() {
        if (typeDemand === 2) {
            return (
                <div>
                    <label htmlFor="serviceList">Service :</label>
                    <select value={selectedService} className='serviceListNameStatus' onChange={handleServiceSelection}>
                        <option value="" disabled>-- Sélectionner un service --</option>
                        {services.map(service => (
                            <option key={service.id} value={service.id}>{service.name}</option>
                        ))}
                    </select>
                    <div>
                        <label htmlFor="serviceStatus">Statut :</label>
                        <select id="serviceStatus" className='serviceListNameStatus' value={serviceStatus} onChange={handleServiceStatusChange}>
                            <option value="" disabled>-- Sélectionner un statut --</option>
                            <option value="0">Opérationnel</option>
                            <option value="1">Maintenance</option>
                            <option value="2">Interruption partielle</option>
                            <option value="3">Panne majeure</option>
                        </select>
                    </div>
                </div>
            );
        } else {
            if (typeDemand === 3) {
                return (
                    <div>
                        <label htmlFor="serviceList">Service :</label>
                        <select value={selectedService} className='serviceListNameStatus' onChange={handleServiceSelection}>
                            <option value="" disabled>-- Sélectionner un service --</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                    </div>
                );
            }
        }
    }

    return(
        <div>
            <MenuBar/>
            <div className="adminPanel">
                <h2>Gestion des services</h2>
                <div className="adminButtonPanel">
                    <button onClick={handleAddService}>Ajouter un service</button>
                    <button onClick={handleModifyService}>Modifier un service</button>
                    <button onClick={handleDeleteService}>Supprimer un service</button>
                    {showPopup && (
                        <div className="popup">
                            <div className="popup-content">
                            <h2>{titlePopup}</h2>
                            <form>
                                {listService()}
                                <label htmlFor="serviceName">Nom du service :</label>
                                <input type="text" id="serviceName" value={serviceName} onChange={handleServiceNameChange} disabled={typeDemand === 3}/>

                                <label htmlFor="serviceIp">Adresse IP :</label>
                                <input type="text" id="serviceIP" value={serviceIP} onChange={handleServiceIPChange} disabled={typeDemand === 3}/>

                                <label htmlFor="servicePort">Port :</label>
                                <input type="text" id="servicePort" value={servicePort} onChange={handleServicePortChange} disabled={typeDemand === 3}/>

                                <div className="popup-buttons">
                                    <button type="submit" style={{backgroundColor: submitPopupColor}} onClick={(e) => handleSubmit(e)}>{submitPopup}</button>
                                    <button onClick={handleClosePopup} style={{backgroundColor: "grey"}}>Annuler</button>
                                </div>
                            </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
