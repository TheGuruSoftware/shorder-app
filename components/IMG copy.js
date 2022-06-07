import { useState, useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import Spinner from '../components/Spinner'
import Button from '../components/Button'
import { imageConfigDefault } from 'next/dist/shared/lib/image-config';

const IMG = ({ id, url, author, alllikes, user, description }) => {
    const [likes, setLikes] = useState(alllikes || {});
    const [likeNumber, setLikeNumber] = useState(0);
    const [liked, setLiked] = useState(likes[user.id]);
    const [loading, setLoading] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    useEffect(() => {
        setLikeNumber(Object.values(likes).reduce((a, b) => a + b, 0));
    }, [likes]);
    useEffect(() => {
        if (user) {
            setLiked(likes[user.id] || 0);
        }
    }, [likes, user]);


    const handleLike = async (id, like) => {
        const res = await fetch('/api/like', {
            method: 'POST',
            body: JSON.stringify({ id: id, userId: user.id, like: like }),
        })

        if (!res.ok) {
            throw new Error(res.statusText)
        }

        const updated = await res.json()
        if (updated.updated) {
            setLikes(updated.updated.likes)
        } else {
            alert("Błąd")
        }
    }
    const handleClick = async (like) => {
        setLoading(true);
        try {
            await handleLike(id, liked == like ? 0 : like);
            setLoading(false);
        } catch (err) {
            alert(err)
            setLoading(false)
        }
    }
    return (
        <div key={id} className="h-fit px-2 border shadow hover:shadow-md overflow-hidden rounded bg-gray-100" onMouseEnter={() => setShowDescription(true)} onMouseLeave={() => setShowDescription(false)} >
            <Link href={`/user/${author.id}`}>
                <a className="font-semibold">@{author.username}</a>
            </Link>
            <Link href={`/image/${id}`}>
                {showDescription ? (
                    <div className="aspect-square overflow-hidden relative bg-white/25 backdrop-blur">
                        {description}
                    </div>
                ) : (
                    <a className="block aspect-square overflow-hidden relative">
                        <Image src={url} layout="fill" objectFit="cover" className="rounded" priority={true} />
                    </a>
                )}
            </Link>
            <div className="my-1">
                👍{likeNumber}
            </div>
            <div className="flex items-center mb-2 text-base gap-2">
                {loading ?
                    <div className="mx-auto">
                        <Spinner className="w-5 h-5" />
                    </div>
                    : (user && (
                        <>
                            <Button oclass={`w-1/2 hover:border-l-8 border-red-400 ${liked == -1 && "text-red-600 border-x-2"}`} onClick={() => handleClick(-1)}>-</Button>
                            <Button oclass={`w-1/2 hover:border-l-8 border-green-400 ${liked == 1 && "text-green-600 border-x-2"}`} onClick={() => handleClick(1)}>+</Button>
                        </>
                    ))}

            </div>
        </div >
    );
}

export default IMG;