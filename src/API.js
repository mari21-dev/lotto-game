import React from "react";

export const sendData = async (url, ticket) => {
    let count = 0

    const fetchData = async () => {

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(ticket),
        });

        if (!response.ok) {
            const timer = setInterval(() => {
                count++;

                if (count > 2) {
                    console.log("stopped interval");
                    clearInterval(timer);
                } else {
                    console.log("restart interval");
                    fetchData(url, ticket)
                }
            }, 2000);
        } else{
            alert(`Данные по адресу ${url} успешно отправлены, статус ${response.status}`);

        }
        if (count >= 2) {
            alert(Error(`Ошибка по адресу ${url}, статус ошибки ${response.status}`))
        }

        return await response.json()
    }

    fetchData()
}