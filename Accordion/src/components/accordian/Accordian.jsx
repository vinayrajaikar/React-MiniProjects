import { useEffect, useState } from "react";
import data from "./data";

export default function Accordian() {

    const [selected, setSelected] = useState(null);
    const [arr, setArr] = useState([false, false, false, false]);
    const [MultipleSelection, setMultipleSelection] = useState(false);

    const handleSingleSelection = (getCurrentId) => {
        setSelected(selected === getCurrentId ? null : getCurrentId);
    };

    const handleMultipleSelection = (getCurrentId) => {
        const newArr = [...arr];
        newArr[getCurrentId - 1] = !newArr[getCurrentId - 1];
        setArr(newArr);
    };

    return (
        <div className=" p-4">
            <button
                onClick={() => setMultipleSelection(!MultipleSelection)}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                {MultipleSelection ? "Enabled Multiple ✔️" : "Disable Multiple ❌"}
            </button>
            <div className=" space-y-4">
                {data && data.length > 0 ? (
                    data.map((dataItem) => (
                        <div key={dataItem.id} className="item border rounded-lg overflow-hidden">
                            <div
                                onClick={() =>
                                    MultipleSelection ? handleMultipleSelection(dataItem.id) : handleSingleSelection(dataItem.id)
                                }
                                className="title flex justify-between items-center bg-gray-100 p-4 cursor-pointer hover:bg-gray-200 transition"
                            >
                                <h3 className="text-lg font-medium">{dataItem.question}</h3>
                                <span className="text-xl">{selected === dataItem.id || arr[dataItem.id - 1] ? "-" : "+"}</span>
                            </div>

                            {(MultipleSelection ? arr[dataItem.id - 1] : selected === dataItem.id) && (
                                <div className="answer bg-white p-4 border-t">
                                    <p>{dataItem.answer}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div>No data found!</div>
                )}
            </div>
        </div>
    );
}
