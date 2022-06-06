import { useRouter } from 'next/router';
import { getImageFromId, getUserFromId } from '../../sb';
import moment from 'moment';
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
        <main className="p-2 text-sm">
            <table>
                <tbody className>
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
                </tbody>
            </table>
        </main>
    );
}

export default ImagePage;