import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Channel,
  Chat,
  Message,
  MixedTextTypedElement,
  TimetokenUtils,
  User,
} from "@pubnub/chat";
import "./app.css";
import { getAllUsers } from "../utils/fetchUser";


export default function ChatApp() {
  const [chat, setChat] = useState<Chat>();
  const [text, setText] = useState("");
  const [channel, setChannel] = useState<Channel>();
  const [messages, setMessages] = useState<Message[]>([]);
  const messageListRef = useRef<HTMLElement>(null);
  const [users, setUsers] = useState<any>([]);

  const userData = users?.map((user: any) => {
    return {
      id: user?.id.toString(),
      data: {
        name: user.nickName,
        custom: { initials: "SA", avatar: "#9fa7df" },
      },
    };
  });
  const randomizedUsers = Math.random() < 0.5 ? userData : userData.reverse();

  
  async function handleSend(event: React.SyntheticEvent) {
    event.preventDefault();
    if (!text || !channel) return;
    await channel.sendText(text);
    setText("");
  }

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);
  console.log(users, ";usu");
  useEffect(() => {
    if (!messageListRef.current) return;
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!channel) return;
    return channel.connect((message: any) =>
      setMessages((messages) => [...messages, message])
    );
  }, [channel]);

  useEffect(() => {
    async function initalizeChat() {
      const chat = await Chat.init({
        publishKey: "pub-c-eafa8c74-d8e8-4b72-b5fe-8e83c98886ff",
        subscribeKey: "sub-c-1dd0a08c-ec68-45a5-a759-40baff5d89b5",
        userId: randomizedUsers[0]?.id,
      });
      const currentUser = await chat.currentUser.update(
        randomizedUsers[0].data
      );
      const interlocutor =
        (await chat.getUser(randomizedUsers[1].id)) ||
        (await chat.createUser(randomizedUsers[1].id, randomizedUsers[1].data));
      const { channel } = await chat.createDirectConversation({
        user: interlocutor,
        channelData: { name: "Support Channel" },
      });
      setChat(chat);
      // setUsers([currentUser, interlocutor])
      setChannel(channel);
    }

    initalizeChat();
  }, []);

  const renderMessagePart = useCallback(
    (messagePart: MixedTextTypedElement) => {
      if (messagePart.type === "text") {
        return messagePart.content.text;
      }
      if (messagePart.type === "plainLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.link}</a>
        );
      }
      if (messagePart.type === "textLink") {
        return (
          <a href={messagePart.content.link}>{messagePart.content.text}</a>
        );
      }
      if (messagePart.type === "mention") {
        return (
          <a href={`https://pubnub.com/${messagePart.content.id}`}>
            {messagePart.content.name}
          </a>
        );
      }

      return "";
    },
    []
  );

  if (!chat || !channel) return <p>Loading...</p>;

  return (
    <main className="ml-[200px]">
      <header>
        <h3>{channel.name}</h3>
        <h3>{chat.currentUser.name}</h3>
      </header>

      <section className="message-list" ref={messageListRef}>
        <ol>
          {messages.map((message) => {
            const user = users.find((user: any) => user.id == message.userId);
            console.log(user, message, "sdcsdc");
            return (
              <li key={message.timetoken}>
                <div className="flex">
                  <div >
                  <img src={user?.imageUrl} className="rounded-full w-10 h-10" alt="" />
                  </div>
                  {user?.nickName}
                </div>
                <article>
                  <h3>
                    {user?.name}
                    <time>
                      {TimetokenUtils.timetokenToDate(
                        message.timetoken
                      ).toLocaleTimeString([], {
                        timeStyle: "short",
                      })}
                    </time>
                  </h3>
                  <p>
                    {message
                      .getLinkedText()
                      .map((messagePart: MixedTextTypedElement, i: number) => (
                        <span key={String(i)}>
                          {renderMessagePart(messagePart)}
                        </span>
                      ))}
                  </p>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <form className="message-input" onSubmit={handleSend}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Send message"
        />
        <input
          type="submit"
          value="➔"
          onClick={handleSend}
          style={{ color: text && "#de2440" }}
        />
      </form>
    </main>
  );
}
