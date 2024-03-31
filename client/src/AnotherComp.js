import React from 'react';

const AnotherComp = ({ collections, onAddCollection }) => {
    const handleAddNewCollection = (e) => {
        const newCollection = e.target.value;
        if (e.key === 'Enter' && newCollection.trim() !== '') {
            onAddCollection(newCollection);
        }
    };

    return (
        <>
            <div className='anth-top'>
                {collections ? <>
                    <div className="head">Add Collection</div>
                    <div className="create-coll">
                        <input type="text" placeholder="Enter collection name and press Enter" onKeyPress={handleAddNewCollection} />
                        {collections ? <div className='coll-head'>Collections</div> : <></>}
                        <div className="collection-list">
                            {collections.map((collection, index) => (
                                <div key={index} className="collection-item" onClick={() => onAddCollection(collection)}>
                                    {collection}
                                </div>
                            ))}
                        </div>
                    </div></> : <>Loading Collection .....</>}
            </div>
        </>
    );
};

export default AnotherComp;
