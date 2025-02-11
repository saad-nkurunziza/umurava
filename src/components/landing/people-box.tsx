import Image from "next/image";
import React from "react";

const PeopleBox = () => {
  return (
    <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5">
      <div className="flex -space-x-1.5">
        <Image
          className="rounded-full ring-1 ring-background"
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={30}
          height={30}
          alt="Avatar 01"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={30}
          height={30}
          alt="Avatar 02"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
          width={30}
          height={30}
          alt="Avatar 03"
        />
        <Image
          className="rounded-full ring-1 ring-background"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          width={30}
          height={30}
          alt="Avatar 04"
        />
      </div>
      <p className="px-2 text-sm text-muted-foreground">
        Trusted by <strong className="font-medium text-foreground">10K+</strong>{" "}
        people.
      </p>
    </div>
  );
};

export default PeopleBox;
