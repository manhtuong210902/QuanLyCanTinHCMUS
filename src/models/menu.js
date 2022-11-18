module.exports={
    data :()=>{let q=query(collection(db,"foods"))
        onSnapshot(q,(snapshot) => {
            let items= snapshot.docs.map((doc) => {
                return {...doc.data()}
            });
            return items
    });}
}