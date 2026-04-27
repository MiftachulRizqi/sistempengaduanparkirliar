import team from "@/data/team.json";
import Link from "next/link";

type Team = {
  id: string;
  name: string;
  role: string;
  image: string;
};

export default function TeamPage() {
  return (
    <section className="team-premium-section">
      <div className="container">

        <div className="team-premium-header">
          <h1>Tim Kami</h1>
          <p>
            Orang-orang di balik layanan pengaduan parkir liar yang siap membantu masyarakat.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {(team as Team[]).map((item) => (
            <div key={item.id} className="col-md-6 col-lg-4">
              <div className="team-premium-card">

                <div className="team-image-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="team-card-body">
                  <h5>{item.name}</h5>
                  <p>{item.role}</p>

                  <Link href={`/team/${item.id}`} className="btn-team-detail">
                    Lihat Detail
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}