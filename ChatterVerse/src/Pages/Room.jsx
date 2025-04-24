import React, { useState, useEffect } from "react";
import { ID, Query } from "appwrite";
import client, { COLLECTION_ID_MESSAGE, DATABASE_ID, databases, } from "../appwriteConfig";
import  {Trash2} from 'react-feather'

const Room = () => {
  const [message, setMessage] = useState([]);
  const [messagebody, setMessagebody] = useState("");

  const getMessages = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID_MESSAGE,
        [
          Query.orderDesc("$createdAt"), 
          Query.limit(5)
        ]
      );
      console.log("Response:", response);
      setMessage(response.documents);
    } catch (error) {
      console.log("Error fetching messages:", error)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let payload = {
      body: messagebody,
    };

    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGE,
      ID.unique(),
      payload
    );
    console.log("created:", response);
    // setMessage((prevMsg) => [response, ...message])
    setMessagebody("");
  };

  const deleteMessage = async (message_id) => {
   await databases.deleteDocument(DATABASE_ID, COLLECTION_ID_MESSAGE, message_id)
    // setMessage(prev => prev.filter(msg => msg.$id !== message_id))
  }
 
  useEffect(() => {
    getMessages();
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGE}.documents`, response => {
      console.log("Real time",response)

      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        setMessage((prevMsg) => [response.payload, ...prevMsg])
        console.log("A msg is created")
      }

      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        setMessage(prev => prev.filter(msg => msg.$id !== response.payload.$id))
        console.log("A msg is delete")
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <main className="container">
      <div className="room--container">
        <form onSubmit={handleSubmit} id="message--form">
          <div>
            <textarea
              required
              maxLength="1000"
              placeholder="Say something"
              onChange={(e) => {
                setMessagebody(e.target.value);
              }}
              value={messagebody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <input className="btn btn--secondary" type="submit" value="Send" />
          </div>
        </form>

        <div>
          {message.map((message) => (
            <div className="message--wrapper" key={message.$id}>
              <div className="message--header">
                <small className="message-timestamp">
                 {new Date(message.$createdAt).toLocaleString()}
                </small>
                <Trash2  className="delete--btn" onClick={() => {deleteMessage(message.$id)}}/>
                
              </div>
              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Room;
