import { React,useState,useEffect }  from 'react'

export default function AddItem(){
    const [data,setData] = useState([])
  const [description,setDescription] = useState('')
  const [name,setName] = useState('') 
  const [method,setMethod] = useState('')
  const [ingredients,setIngredients] = useState('')
  const [author,setAuthor] = useState('')

  useEffect(() =>  { 
    fetch("http://localhost:3000/transactions")
    .then(res => res.json())
    .then(transactions =>{
      setData(transactions)
    })
  },[])

  function handleSubmit(e){
    e.preventDefault()
    let transObject ={
      name:name,
      description:description,
      ingredients:ingredients,
      method:method,
      author: author,
    }
    fetch("http://localhost:3000/recipe",
    {
      method:'POST',
      headers:{
        "Content-Type":"application/json"
      },
      body: JSON.stringify(transObject)
    })
    .then(response => response.json())
    .then(recipe =>{ 
      let newRecipe = [...data,recipe]
      setData(newRecipe)
    })
  }
  return(
    <form className="row g-3" onSubmit={handleSubmit}>
       
  <div className="col-auto">
    <input type="text" placeholder='Name' className="form-control"  required   onChange={(e)=> setName(e.target.value)}/>
  </div>
  <div className="col-auto">
    <input type="text" placeholder='Description' className="form-control"  required   onChange={(e)=> setDescription(e.target.value)}/>
  </div>
  <div className="col-auto">
    <input type="text" placeholder='Ingredients' className="form-control"  required   onChange={(e)=> setIngredients(e.target.value)}/>
  </div>
  <div className="col-auto">
    <input type='text' placeholder='Method' className="form-control"  required   onChange={(e)=> setMethod(e.target.value)}/>
  </div>
  <div className="col-auto">
    <input type='text' placeholder='Author' className="form-control"  required   onChange={(e)=> setAuthor(e.target.value)}/>
  </div>
  <div className="col-auto">
    <button type="submit" className="btn btn-primary mb-2">Add Recipe</button>
  </div>
</form>

  )
}