// export const GET = async (Request,Response)=>{
// // console.log("GET shcbascn");

// return Response("REciving",{status:200})
// }


export async function GET(req, res, next){
    let todos = [
      {
        "id": 1695796969805,
        "title": "Buy groceries",
        "completed": false
      },
      {
        "id": 1695797886085,
        "title": "Complete coding assignment",
        "completed": false
      },
      {
        "id": 1695797070833,
        "title": "Finish reading a book",
        "completed": false
      },
      {
        "id": 1695797065983,
        "title": "Go to the shop",
        "completed": false
      }
    ]
    let data = JSON.stringify(todos);
    return new Response(data, {status:200});
  
  }