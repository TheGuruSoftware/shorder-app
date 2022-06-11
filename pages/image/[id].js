import { getImageFromId, getUserFromId, getUsers } from '../../sb';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import Button from '../../components/Button';
import "moment/locale/pl"
import { useState, useEffect } from 'react';
import { useAuth } from '../../auth';
import Input from '../../components/Input';
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
    const [comments, setComments] = useState(data.comments || []);
    const [likes, setLikes] = useState(data.likes || {});
    const [liked, setLiked] = useState(false);
    const [likeNumber, setLikeNumber] = useState(0);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const { user } = useAuth();
    useEffect(() => {
        if (likes)
            setLikeNumber(Object.values(likes).reduce((a, b) => a + b, 0));
    }, [data, users])
    useEffect(() => {
        if (user) {
            setLiked(likes[user.id] || 0);
        }
        setLikeNumber(Object.values(likes).reduce((a, b) => a + b, 0));
    }, [likes, user])

    const handleLike = async (like) => {
        setLoading(true);
        try {
            const res = await fetch('/api/like', {
                method: 'POST',
                body: JSON.stringify({ id: data.id, userId: user.id, like: liked == like ? 0 : like }),
            })

            if (!res.ok) {
                throw new Error(res.statusText)
            }

            const updated = await res.json()
            console.log(await updated)
            if (updated) {
                setLikes(updated.likes)
            } else {
                alert("Błąd")
            }
            setLoading(false);
        } catch (err) {
            alert(err)
            setLoading(false)
        }
    }

    const handleComment = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({ id: data.id, author: user.id, text: comment }),
            })

            if (!res.ok) {
                throw new Error(res.statusText)
            }

            const updated = await res.json()
            console.log(await updated)
            if (updated) {
                setComments(updated)
            } else {
                alert("Błąd")
            }
            setLoading(false);
        } catch (err) {
            alert(err)
            setLoading(false)
        }
    }
    let x = 0;
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
            <div className="sm:h-3/4 p-2 bg-gray-100 border-y">
                <div className="relative aspect-square h-full mx-auto my-auto">
                    <Image src={data.url} alt={data.description} layout="fill" objectFit="cover" className="rounded" priority={true} />
                </div>
            </div>
            <div className='px-2 mt-1'>
                {data.description}
            </div>
            <div className="flex px-2 w-1/2 gap-3 mb-2 mt-1">
                <div>
                    👍 {likeNumber}
                </div>
                <div>
                    ({Object.keys(data.likes).length})
                </div>
                <div className="flex w-24">
                    <Button oclass={`w-1/2 hover:border-l-8 border-red-400 ${liked == -1 && "text-red-600 border-x-2"}`} onClick={() => handleLike(-1)}>-</Button>
                    <Button oclass={`w-1/2 hover:border-l-8 border-green-400 ${liked == 1 && "text-green-600 border-x-2"}`} onClick={() => handleLike(1)}>+</Button>
                </div>
            </div>
            <div className="p-2 border-y">
                <div className="flex gap-3">
                    <div className="font-semibold my-auto">Komentarze</div>
                    <Input type="text" placeholder="Wpisz komentarz..." onChange={e => setComment(e.currentTarget.value)} />
                    <Button onClick={handleComment}>Skomentuj</Button>
                </div>
                <table>
                    <tbody>
                        {comments.length > 0 && comments.sort(function (a, b) {
                            return new Date(b.createdAt) - new Date(a.createdAt);
                        }).map(c => {
                            x++
                            const author = users.find(user => user.id == c.author)
                            return (
                                <tr key={x} className="border-b last:border-none" >
                                    <td className="font-semibold pr-2">
                                        <Link href={`/user/${c.author}`}>
                                            <a>
                                                @{author.username}
                                            </a>
                                        </Link>
                                    </td>
                                    <td className="pr-2">
                                        {c.text}
                                    </td>
                                    <td className="text-xs text-gray-500 font-normal italic font-light">
                                        {moment(c.createdAt).fromNow()}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </main >
    );
}

export default ImagePage;