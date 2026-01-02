import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import html2pdf from 'html2pdf.js'; 
import { Download, ArrowLeft, CheckCircle } from 'lucide-react';
import UseAxiosSecure from '../hooks/UseAxiosSecure';

const InvoicePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = UseAxiosSecure();
    const componentRef = useRef();

    const { data: payment, isLoading, isError } = useQuery({
        queryKey: ['payment', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${id}`);
            console.log(id);
            console.log(res.data);
            return res.data.data;
        }
    });
    

    const handleDownloadPDF = () => {
        const element = componentRef.current;
        const options = {
            margin: 10,
            filename: `Invoice_${payment?.transactionId}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 2, 
                useCORS: true,
                backgroundColor: '#ffffff',
                
                onclone: (clonedDoc) => {
                    clonedDoc.documentElement.style.cssText = "background-color: #ffffff !important; color: #000000 !important;";
                    clonedDoc.body.style.cssText = "background-color: #ffffff !important; color: #000000 !important; margin: 0 !important;";
                    
                    const container = clonedDoc.getElementById('invoice-content');
                    if(container) {
                        container.style.backgroundColor = '#ffffff';
                        container.style.color = '#000000';
                    }
                }
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
    };

    if (isLoading) return <div className="h-screen flex justify-center items-center"><span className="loading loading-spinner loading-lg"></span></div>;
    if (isError || !payment) return <div className="text-center text-red-500 mt-20">Invoice not found.</div>;

    console.log("User Email:", payment.userEmail);
    console.log("Seller Email:", payment.sellerEmail);

    const styles = {
        container: { backgroundColor: '#ffffff', padding: '40px', fontFamily: 'Arial, sans-serif', color: '#000000', maxWidth: '800px', margin: '0 auto', border: '1px solid #eee' },
        header: { display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eeeeee', paddingBottom: '20px', marginBottom: '20px' },
        title: { fontSize: '32px', fontWeight: 'bold', margin: 0 },
        textMeta: { color: '#666666', fontSize: '14px', margin: '5px 0' },
        successBadge: { backgroundColor: '#dcfce7', color: '#166534', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '5px', marginTop: '10px' },
        row: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px' },
        sectionTitle: { fontSize: '12px', color: '#999999', textTransform: 'uppercase', fontWeight: 'bold', marginBottom: '5px' },
        boldText: { fontWeight: 'bold', fontSize: '16px', margin: 0 },
        table: { width: '100%', borderCollapse: 'collapse', marginBottom: '20px' },
        th: { textAlign: 'left', padding: '10px', backgroundColor: '#f3f4f6', color: '#4b5563', fontSize: '14px', borderBottom: '1px solid #ddd' },
        td: { padding: '15px 10px', borderBottom: '1px solid #eeeeee', fontSize: '14px' },
        totalBox: { width: '250px', marginLeft: 'auto' },
        flexBetween: { display: 'flex', justifyContent: 'space-between', padding: '5px 0' },
        footer: { textAlign: 'center', marginTop: '40px', borderTop: '1px solid #eeeeee', paddingTop: '20px', color: '#888888', fontSize: '12px' }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            
            <div className="max-w-3xl mx-auto mb-6 flex justify-between items-center">
                <button onClick={() => navigate('/')} className="flex items-center gap-2 text-gray-600 hover:text-black">
                    <ArrowLeft size={20}/> Back to Home
                </button>
                <button 
                    onClick={handleDownloadPDF} 
                    className="btn btn-primary text-white flex items-center gap-2 shadow-lg"
                >
                    <Download size={18}/> Download Invoice
                </button>
            </div>

            {/* --- INVOICE PAPER (Pure Inline Styles) --- */}
            <div ref={componentRef}>
                <div id="invoice-content" style={styles.container}>
                    
                    {/* Header */}
                    <div style={styles.header}>
                        <div>
                            <h1 style={styles.title}>INVOICE</h1>
                            <p style={styles.textMeta}># {payment.transactionId?.slice(-8).toUpperCase()}</p>
                            <div style={styles.successBadge}>
                                <span>✔ Paid Successfully</span>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>TeeStore.</h2>
                            <p style={styles.textMeta}>123 Fashion Street</p>
                            <p style={styles.textMeta}>Dhaka, Bangladesh</p>
                            <p style={styles.textMeta}>support@teestore.com</p>
                        </div>
                    </div>

                    {/* Info Row */}
                    <div style={styles.row}>
                        <div>
                            <h3 style={styles.sectionTitle}>Billed To</h3>
                            <p style={styles.boldText}>{payment.userEmail}</p>
                            <p style={styles.textMeta}>ID: {payment.userEmail?.split('@')[0]}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={styles.sectionTitle}>Payment Details</h3>
                            <p style={styles.textMeta}><strong>Date:</strong> {new Date(payment.paidAt).toLocaleDateString()}</p>
                            <p style={styles.textMeta}><strong>Time:</strong> {new Date(payment.paidAt).toLocaleTimeString()}</p>
                            <p style={styles.textMeta}><strong>Method:</strong> Card</p>
                        </div>
                    </div>

                    {/* Table */}
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>Description</th>
                                <th style={{...styles.th, textAlign: 'right'}}>Seller</th>
                                <th style={{...styles.th, textAlign: 'right'}}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style={styles.td}>
                                    <p style={{ fontWeight: 'bold', margin: 0 }}>Order Payment</p>
                                    <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>Trans ID: {payment.transactionId}</p>
                                </td>
                                <td style={{...styles.td, textAlign: 'right'}}>{payment.sellerEmail}</td>
                                <td style={{...styles.td, textAlign: 'right', fontWeight: 'bold'}}>৳{payment.priceTk}</td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Total */}
                    <div style={styles.totalBox}>
                        <div style={styles.flexBetween}>
                            <span style={{color: '#666'}}>Subtotal</span>
                            <span style={{color: '#666'}}>৳{payment.priceTk}</span>
                        </div>
                        <div style={styles.flexBetween}>
                            <span style={{color: '#666'}}>Tax (0%)</span>
                            <span style={{color: '#666'}}>৳0.00</span>
                        </div>
                        <div style={{...styles.flexBetween, borderTop: '1px solid #eee', marginTop: '10px', paddingTop: '10px'}}>
                            <span style={{fontWeight: 'bold', fontSize: '18px'}}>Total</span>
                            <span style={{fontWeight: 'bold', fontSize: '18px'}}>৳{payment.priceTk}</span>
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={styles.footer}>
                        <p style={{margin: '5px 0'}}>Thank you for shopping with TeeStore!</p>
                        <p style={{margin: 0}}>If you have any questions, please contact support.</p>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default InvoicePage;