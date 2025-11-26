import React from 'react';

const TodoFilter = ({ filter, setFilter, filtersObject }) => {
    console.log("Todo Filter Rendered!");

    const switcher = Object.keys(filtersObject); //return ['All', 'Todo', 'Done']

    return (
        <div>
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
