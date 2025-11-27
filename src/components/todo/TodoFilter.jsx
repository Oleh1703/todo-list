import React from 'react';

const TodoFilter = ({ filter, setFilter, filtersObject }) => { 
    /*
    filter -> стан поточного фільтра
    setFilter -> функція для зміни фільтра
    filtersObject -> обєкт із фільтрами
    */
    console.log("Todo Filter Rendered!");

    //return ['All', 'Todo', 'Done']
    const switcher = Object.keys(filtersObject); 

    return (
        <div>
            {/* Рендеримо кнопку для кожного фільтра */}
            {switcher.map((swt) =>
                <button key={swt}
                    onClick={() => setFilter(swt)}
                    style={{ backgroundColor: filter === swt ? '#fcc3c3ff' : '#fff', border: 'none' }}>
                    {swt}
                </button>
            )}
        </div>
    );
}

export default React.memo(TodoFilter);
