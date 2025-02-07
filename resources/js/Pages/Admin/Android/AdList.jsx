import { Head, Link } from '@inertiajs/react';
import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';

export default function AdList({ title, androidAds }) {
    return (
        <Authenticated >
            <Head title={title} />
            <div className="card-box table-responsive">

                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                            <th>Ad Name</th>
                            <th>Status</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {androidAds && androidAds.map((ad) => (
                            <tr key={ad.id} id={`card_box_id_${ad?.id}`}>
                                <td>{ad.ads_name}</td>
                                <td><span className={`badge badge-${ ad?.status == 1 ? "success" : "danger" }`}>{ad?.status == 1 ? "Active" : "Inactive"}</span> </td>

                                <td>
                                    <Link href={route('admin.android-ad.create', ad.id)} className="btn btn-icon waves-effect waves-light btn-success m-b-5 m-r-5" data-toggle="tooltip" title="Edit"> <i className="fa fa-edit"></i> </Link>
                                    
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </Authenticated>
    );
}
