import { getUserFromId } from '../../sb';
import Avatar from '../../components/Avatar';

export async function getServerSideProps(context) {
    const { id } = context.params;
    const user = await getUserFromId(id)
    return {
        props: {
            u: user || {},
        }
    }
}
const UserPage = ({ u }) => {
    return (
        <main className="text-sm w-full min-h-screen">
            <div className="w-full bg-gray-100 p-4 border-b shadow-sm flex align-middle">
                <div className="my-auto">
                    <Avatar src={u.avatar} />
                </div>
                <div className="">
                    {u.username}
                </div>
            </div>
        </main >
    );
}

export default UserPage;