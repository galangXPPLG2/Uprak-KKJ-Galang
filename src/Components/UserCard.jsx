import { useAppContext } from "../Context/UserContext";

const UserCard = ({ user }) => {
  const { likedUsers, followedUsers, toggleLike, toggleFollow } = useAppContext();

  const isLiked = likedUsers.has(user.id);
  const isFollowed = followedUsers.has(user.id);

  return (
    <div className="user-card">
      <div className="user-header">
        <div className="avatar">
          {user.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2>{user.name}</h2>
          <span>@{user.username}</span>
        </div>
      </div>

      <p>✉️ {user.email}</p>
      <p>📍 {user.address.city}</p>

      <div className="card-actions">
        <button
          className={`btn-like ${isLiked ? "active" : ""}`}
          onClick={() => toggleLike(user.id)}
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>

        <button
          className={`btn-follow ${isFollowed ? "active" : ""}`}
          onClick={() => toggleFollow(user.id)}
        >
          {isFollowed ? "✔ Following" : "+ Follow"}
        </button>
      </div>
    </div>
  );
};

export default UserCard;