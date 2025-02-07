import React from 'react';
import { Link } from '@inertiajs/react';

export default function Breadcrumb({ data }) {
  return (
    <>
      <div
        className="breadcrumb-section bg-xs"
        style={{
          backgroundImage: `url('${asset_url}/images/breadcrum-bg.jpg')`,
        }}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <h2>{data && data[data.length - 1]?.name}</h2> {/* Display the last item as the page title */}
              <nav id="breadcrumbs">
                <ul>
                  {data?.map((item, index) => (
                    <li key={index}>
                      {index === data.length - 1 ? (
                        item.name
                      ) : (
                        <Link href={item.url} title={item.name}>
                          {item.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
