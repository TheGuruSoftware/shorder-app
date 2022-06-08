import { getImageFromId, getUserFromId, getUsers } from '../../sb';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import "moment/locale/pl"
import { useState, useEffect } from 'react';
export async function getServerSideProps(context) {
    const { id } = context.params;
    const data = await getImageFromId(id)
    const author = await getUserFromId(data.author)
    const users = await getUsers()
    return {
        props: {
            data: data || {},
            author: author || {},
            users: users || {}
        }
    }
}
const ImagePage = ({ data, author, users }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        if (data.comments) {
            if (Object.keys(data.comments).length > 0) {

                let newComments = []
                Object.keys(data.comments).forEach(key => {
                    newComments.push({ user: users.find(u => u.id == key), text: data.comments[key] })
                })
                setComments(newComments)
            }
            else
                setComments([])
        }
    }, [data, users])
    return (
        <main className="text-sm w-full h-screen">
            <div className="flex justify-between w-full p-2">
                <div className="font-semibold text-base">
                    <Link href={`/user/${author.id}`}>
                        <a>
                            @{author.username}
                        </a>
                    </Link>
                </div>
                <div>
                    {moment(data.created_at).format('LLLL')}
                </div>
            </div>
            <div className="w-full border-y h-3/4 py-2 bg-gray-100">
                <div className="relative aspect-square h-full mx-auto my-auto">
                    <Image src={data.url} alt={data.description} layout="fill" objectFit="cover" className="rounded" priority={true} />
                </div>
            </div>
            <div className='px-2'>
                {data.description}
            </div>
            <div className="flex gap-3 px-2">
                <div>
                    👍 {Object.values(data.likes).reduce((a, b) => a + b, 0)}
                </div>
                <div>
                    ({Object.keys(data.likes).length})
                </div>
            </div>
            <div className="px-2 border-y">
                <span className="font-semibold">Komentarze</span>
                <table>
                    <tbody>
                        {comments.length > 0 && comments.map(c => (
                            <tr key={c.user.id} className="border-b last:border-none">
                                <td className="font-semibold pr-2">
                                    <Link href={`/user/${c.user.id}`}>
                                        <a>
                                            @{c.user.username}
                                        </a>
                                    </Link>
                                </td>
                                <td>
                                    {c.text}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ImagePage;