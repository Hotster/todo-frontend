import FolderItem from "../FolderItem/FolderItem";

const FoldersList = ({ folderList }) => {
    if (!folderList.length) {
        return null;
    }

    return (
        <div>
            {folderList.map((item) => {
                return <FolderItem key={item.id} name={item.name} link={`folders/${item.id}`} />
            })}
        </div>
    );

};

export default FoldersList;
