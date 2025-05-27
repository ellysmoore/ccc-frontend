"use client";

import React, { useState } from "react";
import { FaAngleDoubleRight, FaEdit, FaTrash } from "react-icons/fa";
import { Message } from "@/types/messageType";
import { MESSAGE_DATA, PLAYLIST_DATA } from "@/data/dummyData";
import { MessageCard } from "@/app/(components)/MessageCard";
import { SermonCard, SermonSection } from "../../message/(components)";
import { Playlist } from "@/types/playlistType";
import { BiSolidPlaylist } from "react-icons/bi";
import { EditPlaylistModal } from "../(components)/EditPlaylistModal";

const SinglePlaylistIndexPage = () => {
  const user = {};
  const [openModal, setOpenModal] = useState("");
  const [downloads, setDownload] = useState<Message[]>(MESSAGE_DATA);
  const [messages, setMessages] = useState<Message[]>(MESSAGE_DATA);
  const [related, setRelated] = useState<Message[]>(MESSAGE_DATA);
  const [playlist, setPlaylist] = useState<Playlist | null>(PLAYLIST_DATA[0]);

  console.log(setDownload, setMessages, setRelated, setPlaylist);

  return (
    <>
      <div className="flex h-full flex-col md:flex-row gap-[12px]">
        {/* Main Content */}
        <div className="h-full overflow-hidden hover:overflow-y-auto border-2 border-[#F4F7F8] shadow-md rounded-2xl w-full py-[12px] md:py-[15px] px-[20px] md:px-[25px] md:w-3/4 flex flex-col gap-6">
          <div className="bg-white min-h-[180px] md:min-h-[200px] rounded-[14px] shadow overflow-hidden flex flex-col md:flex-row">
            <div className="flex items-center justify-center w-full md:w-1/3 relative h-full bg-gray-50">
              <BiSolidPlaylist size={80} className="text-gray-300" />
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-bold">
                {playlist?.name.replace(/_/g, " ")}
              </h2>
              <p className="truncate text-[14px] leading-[140%] my-2">
                {playlist?.description}
              </p>

              {/* Actions */}
              <div className="mt-5 flex items-center gap-[15px] text-gray-700">
                <button
                  onClick={() => setOpenModal("edit")}
                  className="cursor-pointer whitespace-nowrap bg-[#EEF0F3] hover:bg-[#F6F8FA] h-fit w-fit gap-[10px] flex items-center justify-center text-[#0D0D12] px-[20px] py-[10px] rounded-full shadow-md transition"
                >
                  <FaEdit size={16} />
                  Edit
                </button>
                <button
                  onClick={() => null}
                  className="cursor-pointer whitespace-nowrap bg-[#EEF0F3] hover:bg-[#F6F8FA] h-fit w-fit gap-[10px] flex items-center justify-center text-[#0D0D12] px-[20px] py-[10px] rounded-full shadow-md transition"
                >
                  <FaTrash size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Songs in Playlist */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Songs in this Playlist
            </h3>
            <div className="divide-y divide-gray-200 bg-white rounded-lg shadow overflow-hidden">
              {related.map((song, index) => (
                <div
                  key={song.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 w-6">
                      {index + 1}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">
                        {song.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {song.speaker}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {song.duration || "3:45"}
                  </span>
                </div>
              ))}
            </div>
          </div> */}

          {/* Related */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((msg) => (
                // @ts-expect-error null
                <MessageCard key={msg.id} user={user} message={msg} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="h-full overflow-hidden hover:overflow-y-auto border-1 border-gray-200 shadow-md rounded-2xl w-full py-[12px] md:py-[15px] px-[12px] md:px-[15px] md:w-1/4 flex flex-col gap-6">
          <SermonSection
            title={
              <div className="flex items-center gap-[5px]">
                <FaAngleDoubleRight />
                Most downloaded
              </div>
            }
          >
            {downloads.map((msg) => (
              // @ts-expect-error null
              <SermonCard key={msg.id} user={user} message={msg} />
            ))}
          </SermonSection>

          <SermonSection
            title={
              <div className="flex items-center gap-[5px]">
                <FaAngleDoubleRight />
                messages Sermons
              </div>
            }
          >
            {messages.map((msg) => (
              // @ts-expect-error null
              <SermonCard key={msg.id} user={user} message={msg} />
            ))}
          </SermonSection>
        </div>
      </div>

      <EditPlaylistModal
        isOpen={openModal == "edit"}
        playlist={playlist}
        onClose={() => setOpenModal("")}
      />
    </>
  );
};

export default SinglePlaylistIndexPage;
