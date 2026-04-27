import team from "@/data/team.json";
import Link from "next/link";

type Team = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export default async function TeamDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = team as Team[];
  const member = data.find((t) => t.id === id);

  if (!member) {
    return (
      <section className="team-detail-section">
        <div className="container">
          <div className="team-not-found-card">
            <h1>Data Tidak Ditemukan</h1>
            <p>ID: {id}</p>

            <Link href="/team" className="btn-team-back">
              Kembali ke Tim
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="team-detail-section">
      <div className="container">
        <div className="team-detail-wrapper">

          <div className="team-detail-card">
            <div className="team-detail-bg-circle circle-top"></div>
            <div className="team-detail-bg-circle circle-bottom"></div>

            <div className="team-detail-image-wrapper">
              <img src={member.image} alt={member.name} />
            </div>

            <span className="team-detail-badge">
              Anggota Tim
            </span>

            <h1>{member.name}</h1>

            <p className="team-detail-role">
              {member.role}
            </p>

            <div className="team-detail-info-box">
              <div>
                <i className="fa-solid fa-user-check"></i>
                <span>Aktif</span>
              </div>

              <div>
                <i className="fa-solid fa-shield-halved"></i>
                <span>Terverifikasi</span>
              </div>
            </div>

            <Link href="/team" className="btn-team-back">
              Kembali ke Tim
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}