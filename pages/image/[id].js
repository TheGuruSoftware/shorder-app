import { getImageFromId, getUserFromId } from '../../sb';
import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import "moment/locale/pl"
export async function getServerSideProps(context) {
    const { id } = context.params;
    const data = await getImageFromId(id)
    const author = await getUserFromId(data[0].author)
    return {
        props: {
            data: data[0] || {},
            author: author[0] || {}
        }
    }
}
const ImagePage = ({ data, author }) => {
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
            <table>
                <tbody>
                    <tr>
                        <td className="font-semibold pr-2">
                            Autor
                        </td>
                        <td className="pl-2">
                            {author.username}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold  pr-2">
                            Dodano
                        </td>
                        <td className="pl-2">
                            {moment(data.created_at).format('LLLL')}
                        </td>
                    </tr>
                    <tr>
                        <td className="font-semibold  pr-2">
                            Reakcje
                        </td>
                        <td className="pl-2">
                            {Object.values(data.likes).reduce((a, b) => a + b, 0)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default ImagePage;