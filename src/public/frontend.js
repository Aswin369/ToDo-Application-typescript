
document.getElementById('add-btn').addEventListener("click", async ()=>{
            const task = document.getElementById("taskInput").value
            console.log(task)
            if(!task){
                alert("Plase enter a task");
                return;
            }
            try{
                const res = await fetch("/task",{
                    method: "POST",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({task})
    
                })
                console.log("This is res",res)
                if(res.ok){
                    // alert("Task added successfully")
                    document.getElementById("taskInput").value = ""
                    location.reload()
                }else{
                    alert("Failed to add task")
                }

            }catch(err){
console.error("Error",err)
            }
        })


        let checkbox = document.querySelectorAll(".task-checkboxIntask")
        checkbox.forEach(checkbox =>{
             checkbox.addEventListener("change", async (e)=>{
            let taskId = e.target.getAttribute("data-id")
            let completed = e.target.checked;
            console.log("id como",completed,taskId)
            try{
                if(completed){
                const res = await fetch("/completed",{
                    method: "PUT",
                    headers:{
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({id:taskId, completed:completed})
                })
                if(res.ok){
                    location.reload()
                }else{
                    alert("Try again")
                }
            }
            }catch(err){
                console.error("Somethingwent worng when task completing")
            }
        })
     })
       

     let dltbtn = document.querySelectorAll(".action-btn")
     dltbtn.forEach(dltbtn =>{
        dltbtn.addEventListener("click", async(e)=>{
            let taskId = e.currentTarget.getAttribute('data-id');
            try{
                let res = await fetch("/delete",{
                    method: "DELETE",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({taskId})
                })

                if(res.ok){
                    location.reload()
                }else{
                    alert("Something went wrong")
                }
            }catch(err){
                console.error("Client error",err)
            }
        })
     })
