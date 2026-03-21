import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const SingleFund = () => {
  const { slug } = useParams();
  const [book, setBook]           = useState(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (!slug) return;
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/book-for-fund/${slug}/`);
        setBook(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <p className="text-[#8C7B6E] text-sm animate-pulse">Loading book...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#F5EFE8] flex items-center justify-center">
      <p className="text-red-400 text-sm">Error: {error}</p>
    </div>
  );

  const images = [book.picture1, book.picture2].filter(Boolean);

  return (
    <main className="bg-[#F5EFE8] min-h-screen px-8 py-8">

      {/* Back nav */}
      <div className="mb-6 border-b border-[#C8B9A8] pb-4">
        <Link
          to="/donate/"
          className="text-[#8C7B6E] text-xs hover:text-[#2C2416] transition-colors duration-150"
        >
          ← Back to Donations
        </Link>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-8">

        {/* Left — images */}
        <div className="flex flex-col gap-3 sm:w-56 shrink-0">
          <div className="rounded-xl overflow-hidden border border-[#C8B9A8] bg-[#EDE4D8] h-72 sm:h-64">
            {images.length > 0 ? (
              <img
                src={images[activeImg]}
                alt={book.book_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-[#8C7B6E] text-xs">No image</p>
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`rounded-lg overflow-hidden border h-14 w-14 shrink-0 transition-all duration-150 ${
                    activeImg === i
                      ? "border-[#2C2416]"
                      : "border-[#C8B9A8] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`view ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Middle — book details */}
        <div className="flex flex-col gap-4 flex-1">
          <div>
            <h1 className="text-[#2C2416] text-xl font-semibold leading-snug">{book.book_name}</h1>
            <p className="text-[#8C7B6E] text-sm mt-1">{book.author_name}</p>
          </div>

          {/* Donation info */}
          <div className="flex flex-col gap-3 border-t border-[#C8B9A8] pt-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#8C7B6E] text-xs">Donation amount</p>
              <p className="text-[#2C2416] text-lg font-semibold">{book.donation} Taka</p>
              <p className="text-[#8C7B6E] text-xs leading-relaxed">
                This amount goes directly to the education fund for street children in Bangladesh.
              </p>
            </div>

            {/* Bkash */}
            <div className="flex flex-col gap-1 bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl px-4 py-3">
              <p className="text-[#8C7B6E] text-xs">Send donation via Bkash</p>
              <p className="text-[#2C2416] text-sm font-semibold">018XXXXXXXX</p>
            </div>
          </div>
        </div>

        {/* Right — donor contact */}
        {book.donor && (
          <div className="sm:w-52 shrink-0">
            <div className="bg-[#EDE4D8] border border-[#C8B9A8] rounded-xl p-5 flex flex-col gap-4 sticky top-24">

              <p className="text-[#2C2416] text-xs font-semibold border-b border-[#C8B9A8] pb-3">
                Donor info
              </p>

              {/* Donor picture + name */}
              <div className="flex items-center gap-3">
                {book.donor.picture ? (
                  <img
                    src={book.donor.picture}
                    alt={book.donor.first_name}
                    className="w-10 h-10 rounded-full object-cover border border-[#C8B9A8]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#C8B9A8] shrink-0" />
                )}
                <div>
                  <p className="text-[#2C2416] text-sm font-semibold">
                    {book.donor.first_name} {book.donor.last_name}
                  </p>
                  <p className="text-[#8C7B6E] text-xs">Donor</p>
                </div>
              </div>

              {/* Phone display */}
              {book.donor.phone && (
                <div className="flex flex-col gap-1 border-t border-[#C8B9A8] pt-3">
                  <p className="text-[#8C7B6E] text-xs">Phone</p>
                  <p className="text-[#2C2416] text-xs font-medium">{book.donor.phone}</p>
                </div>
              )}

              {/* Email display */}
              {book.donor.email && (
                <div className="flex flex-col gap-1">
                  <p className="text-[#8C7B6E] text-xs">Email</p>
                  <p className="text-[#2C2416] text-xs font-medium break-all">{book.donor.email}</p>
                </div>
              )}

              {/* Contact buttons */}
              <div className="flex flex-col gap-2 border-t border-[#C8B9A8] pt-3">
                {book.donor.phone && (
                  
                  <a  href={`https://wa.me/88${book.donor.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-[#2C2416] text-[#EDE4D8] text-xs px-3 py-2 rounded-lg hover:bg-[#4A3728] transition-colors duration-150 text-center"
                  >
                    Contact on WhatsApp
                  </a>
                )}
                {book.donor.email && (
                  
                   <a href={`mailto:${book.donor.email}`}
                    className="w-full border border-[#C8B9A8] text-[#2C2416] text-xs px-3 py-2 rounded-lg hover:bg-[#D9CBBF] transition-colors duration-150 text-center"
                  >
                    Send email
                  </a>
                )}
                {!book.donor.phone && !book.donor.email && (
                  <p className="text-[#8C7B6E] text-xs text-center">
                    No contact available
                  </p>
                )}
              </div>

            </div>
          </div>
        )}

      </div>
    </main>
  );
};

export default SingleFund;