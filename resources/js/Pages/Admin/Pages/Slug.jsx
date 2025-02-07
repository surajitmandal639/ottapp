import Authenticated from '@/Layouts/Admin/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

export default function Slug({ auth, page }) {
  const { data, setData, post, processing, errors } = useForm({
    page_title: page?.title || '',
    page_content: page?.content || '',
    page_order: page?.order || 0,
    status: page?.status || 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('pages.update', page?.id));
  };

  return (
    <>
      <Authenticated user={auth.user}>
        <Head title={page?.title} />
        <div className="card-box">
          <div className="row">
            <div className="col-sm-6">
              <Link href={route('admin.pages.index')}>
                <h4 className="header-title m-t-0 m-b-30 text-primary pull-left" style={{ fontSize: '20px' }}>
                  <i className="fa fa-arrow-left"></i> Back
                </h4>
              </Link>
            </div>
            <div className="col-sm-6">
              <Link href={route('admin.pages.show', page?.slug)} target="_blank">
                <h4 className="header-title m-t-0 m-b-30 text-primary pull-right" style={{ fontSize: '20px' }}>
                  Preview <i className="fa fa-eye"></i>
                </h4>
              </Link>
            </div>
          </div>

          <form onSubmit={handleSubmit} acceptCharset="UTF-8" className="form-horizontal" role="form" encType="multipart/form-data">
            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Page Title*</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  name="page_title"
                  value={data.page_title}
                  onChange={(e) => setData('page_title', e.target.value)}
                  className="form-control"
                />
                {errors.page_title && <div className="text-danger">{errors.page_title}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  name="page_content"
                  rows="10"
                  value={data.page_content}
                  onChange={(e) => setData('page_content', e.target.value)}
                />
                {errors.page_content && <div className="text-danger">{errors.page_content}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Page Order</label>
              <div className="col-sm-8">
                <input
                  type="number"
                  name="page_order"
                  value={data.page_order}
                  onChange={(e) => setData('page_order', e.target.value)}
                  className="form-control"
                  min="0"
                />
                {errors.page_order && <div className="text-danger">{errors.page_order}</div>}
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label">Status</label>
              <div className="col-sm-8">
                <select
                  className="form-control"
                  name="status"
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && <div className="text-danger">{errors.status}</div>}
              </div>
            </div>

            <div className="form-group">
              <div className="offset-sm-3 col-sm-9 pl-1">
                <button type="submit" className="btn btn-primary waves-effect waves-light" disabled={processing}>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Authenticated>
    </>
  );
}
